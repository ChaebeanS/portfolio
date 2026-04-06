// --------------------------------------------------------
    // SCENE SETUP
    // --------------------------------------------------------
    const scene = new THREE.Scene();
    
    // Orthographic camera for a 2D full-screen shader
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);

    // --------------------------------------------------------
    // SHADERS
    // --------------------------------------------------------
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;

        uniform vec3 uColor1; // Deepest Valley (Shadow)
        uniform vec3 uColor2; // Slope Dark
        uniform vec3 uColor3; // Slope Light
        uniform vec3 uColor4; // Peak (Highlight)

        uniform vec3 uLightPos;
        uniform float uDepth;

        uniform float uSpeed;
        uniform float uNoiseScale;
        uniform float uWarpAmount;
        uniform float uFoldFrequency;
        uniform float uAngle;
        uniform float uConnections; // Parameter for organic bridges
        uniform float uShadowWidth; // Control shadow thinness

        // Ashima's 3D Simplex Noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy; 
            vec3 x3 = x0 - D.yyy;      
            i = mod289(i);
            vec4 p = permute( permute( permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z); 
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        // Harmonious, ultra-soft biological surface algorithm
        float getSurface(vec2 p) {
            float c = cos(uAngle), s = sin(uAngle);
            mat2 rot = mat2(c, -s, s, c);
            vec2 rp = rot * p;

            // 1. Macroscopic, buttery-smooth noise
            // Lowered multiplier to 0.25 to make the noise shapes huge and perfectly round
            float n1 = snoise(vec3(rp * uNoiseScale * 0.25, uTime * uSpeed * 0.7));
            float n2 = snoise(vec3(rp * uNoiseScale * 0.25 + vec2(21.4, 15.2), uTime * uSpeed * 0.9));

            // Injecting sine waves directly into the noise vectors forces the distortion to be perfectly round
            // This prevents the simplex noise from ever creating sharp ridges or chaotic blobs
            float trig1 = sin(rp.x * uNoiseScale * 0.5 + uTime * uSpeed) * 0.3;
            float trig2 = cos(rp.y * uNoiseScale * 0.5 - uTime * uSpeed) * 0.3;

            // Soft, rounded flow vectors
            vec2 flow = vec2(n1 + trig1, n2 + trig2);

            // 2. Smooth Domain Warping
            vec2 wp = rp + flow * (uWarpAmount * 0.12);

            // 3. Fluid Mechanics (Harmonious Waves)
            float freq = uFoldFrequency * 0.5;
            
            // Phase modulation (bending the waves instead of intersecting them)
            // This creates beautiful organic folds that curve around each other like soft silk
            float phase = sin(wp.y * freq + flow.y * 2.0) * uConnections;
            
            float mainWave = sin(wp.x * freq + phase * uWarpAmount * 0.3);

            // 4. Subtle depth variation to prevent flatness without breaking smoothness
            float n3 = snoise(vec3(wp * 0.5, uTime * uSpeed * 0.5));

            return (mainWave * 0.85 + n3 * 0.15) * 0.5;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            vec2 p = uv * 2.0 - 1.0;
            p.x *= uResolution.x / uResolution.y;

            // Calculate Normals (Smooth derivatives)
            // Increased epsilon from 0.07 to 0.09. This acts as a heavy blur filter, 
            // ensuring the liquid looks perfectly thick, glossy, and soft.
            vec2 e = vec2(0.09, 0.0);
            float dx = (getSurface(p + e.xy) - getSurface(p - e.xy)) / (2.0 * e.x);
            float dy = (getSurface(p + e.yx) - getSurface(p - e.yx)) / (2.0 * e.x);
            
            // Prevent mathematical singularity (sharp dots) when uDepth is 0.
            // We add a tiny baseline depth so the normal never collapses to a zero vector.
            float safeDepth = max(uDepth, 0.02);
            vec3 normal = normalize(vec3(-dx, -dy, safeDepth));

            // Soft Gradient Lighting
            vec3 lightDir = normalize(uLightPos);
            float diffuse = dot(normal, lightDir) * 0.5 + 0.5;
            
            float t = diffuse;
            // Add slight depth, kept extremely low to prevent height map from overriding the soft normals
            t += getSurface(p) * 0.04; 
            t = clamp(t, 0.0, 1.0);

            // Extra volumetric smoothing curve (Hermite interpolation)
            t = t * t * (3.0 - 2.0 * t);

            // Smooth color mapping to prevent harsh blown-out highlights
            vec3 color = mix(uColor1, uColor2, smoothstep(0.0, uShadowWidth + 0.15, t));
            color = mix(color, uColor3, smoothstep(uShadowWidth + 0.05, 0.65, t));
            color = mix(color, uColor4, smoothstep(0.55, 1.05, t));

            // High-quality Dithering to eliminate banding
            float grain = fract(sin(dot(uv.xy, vec2(12.9898,78.233))) * 43758.5453);
            color += (grain - 0.5) * 0.03;

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    // --------------------------------------------------------
    // PRESETS & SETTINGS
    // --------------------------------------------------------
    // Shared physics parameters based on the latest screenshot
    const sharedParams = {
        depth: 0.04,
        lightX: 0.968,
        lightY: -0.36,
        speed: 0.1148,
        angle: 1.08699,
        foldFrequency: 1.865,
        warpAmount: 4.0,
        noiseScale: 0.714,
        connections: 0.8715,
        shadowWidth: 0.01
    };

    const presets = {
        'Blue/Cyan': {
            color1: '#d1d1b4', // Shadow (Valley)
            color2: '#0c461b', // Mid Dark
            color3: '#5f7a49', // Mid Light
            color4: '#1c3624', // Highlight (Peak)
            ...sharedParams
        }
    };

    // Load default preset
    const settings = {
        preset: 'Blue/Cyan',
        ...presets['Blue/Cyan']
    };

    // --------------------------------------------------------
    // MATERIAL & MESH
    // --------------------------------------------------------
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            
            uColor1: { value: new THREE.Color(settings.color1) },
            uColor2: { value: new THREE.Color(settings.color2) },
            uColor3: { value: new THREE.Color(settings.color3) },
            uColor4: { value: new THREE.Color(settings.color4) },
            
            uDepth: { value: settings.depth },
            uLightPos: { value: new THREE.Vector3(settings.lightX, settings.lightY, 1.0) },

            uSpeed: { value: settings.speed },
            uNoiseScale: { value: settings.noiseScale },
            uWarpAmount: { value: settings.warpAmount },
            uFoldFrequency: { value: settings.foldFrequency },
            uAngle: { value: settings.angle },
            uConnections: { value: settings.connections },
            uShadowWidth: { value: settings.shadowWidth }
        }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --------------------------------------------------------
    // GUI SETUP
    // --------------------------------------------------------
    
    // --------------------------------------------------------
    // RESIZE & ANIMATION LOOP
    // --------------------------------------------------------
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        // Only update time for the fluid movement
        material.uniforms.uTime.value = clock.getElapsedTime();

        renderer.render(scene, camera);
    }

    animate();
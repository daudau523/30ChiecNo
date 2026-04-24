// Khởi tạo Lenis cho Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2, // Nhanh hơn một chút, mượt mà hơn
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Đăng ký ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Cập nhật ScrollTrigger khi Lenis cuộn
lenis.on('scroll', ScrollTrigger.update);

// Đồng bộ GSAP ticker với Lenis
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
});
gsap.ticker.lagSmoothing(0);

// SVG path cho chiếc nơ (Clean & Modern Design)
const bowSVG = `
<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <!-- Ribbon Left -->
  <path d="M50 48 C35 20, 5 25, 10 50 C15 75, 40 70, 50 52" fill="currentColor" opacity="0.95"/>
  <!-- Ribbon Right -->
  <path d="M50 48 C65 20, 95 25, 90 50 C85 75, 60 70, 50 52" fill="currentColor" opacity="0.95"/>
  <!-- Tails Left -->
  <path d="M47 55 L25 90 L42 88 L50 60 Z" fill="currentColor" opacity="0.85"/>
  <!-- Tails Right -->
  <path d="M53 55 L75 90 L58 88 L50 60 Z" fill="currentColor" opacity="0.85"/>
  <!-- Center Knot -->
  <rect x="42" y="44" width="16" height="14" rx="4" fill="currentColor" filter="brightness(1.1)"/>
</svg>
`;

const container = document.getElementById('bows-container');
const totalBows = 30;

// Bảng màu Sặc sỡ, rực rỡ (Vibrant Palette)
const vibrantColors = [
    '#FF3366', // Pink
    '#00D4FF', // Cyan
    '#FFC800', // Yellow
    '#A055FF', // Purple
    '#FF5E5E', // Coral
    '#00D289', // Mint
    '#FF8A00'  // Orange
];

// Mảng 30 lời chúc ý nghĩa gửi chị Thơm
const wishes = [
    "Khởi đầu cho những điều tuyệt vời nhất",
    "Chị luôn là nguồn năng lượng tích cực của mọi người",
    "Nụ cười của chị xua tan mọi mệt mỏi",
    "Mong chị luôn giữ mãi ngọn lửa nhiệt huyết này",
    "Dù công việc có áp lực, chị vẫn luôn vượt qua",
    "Hãy luôn tự tin vì chị thực sự rất giỏi",
    "Một cô gái luôn lan tỏa hương 'Thơm' ngào ngạt",
    "Sẽ luôn có người ở đây cổ vũ chị",
    "Hãy để mọi muộn phiền bay đi theo gió",
    "Mạnh mẽ, độc lập và luôn rực rỡ",
    "Chúc chị mãi kiên cường trước mọi sóng gió",
    "Yêu thương bản thân mình nhiều hơn nhé, chị Thơm",
    "Tỏa sáng lấp lánh theo cách riêng của chị",
    "Dù deadline có dí, hãy luôn mỉm cười",
    "Nghỉ ngơi một chút nếu thấy mệt quá nha chị",
    "Hãy cứ tự do làm những gì chị yêu thích",
    "Một trái tim ấm áp và đầy nhiệt huyết",
    "Mỗi ngày mới là một cơ hội để chị bứt phá",
    "Để em san sẻ bớt những áp lực cùng chị nhé",
    "Chị luôn là phiên bản hoàn hảo nhất của chính mình",
    "Không có áp lực nào làm khó được Đoàn Thị Thơm",
    "Chúc chị một đời an yên, công việc hanh thông",
    "Gửi đến chị sự bình yên của bầu trời đêm",
    "", // Nơ 24 là bằng khen, không cần lời chúc ở đây
    "Mong những vì sao luôn dẫn đường cho chị",
    "Cứ đam mê, cứ rực rỡ như cách chị vẫn làm",
    "Hãy bay cao như những ước mơ của chị",
    "Sẽ luôn là người em ủng hộ chị hết mình",
    "Hương 'Thơm' của sự nỗ lực luôn là tuyệt nhất",
    "Tiếp tục tiến bước và tỏa sáng rực rỡ nhé, chị Thơm!"
];

// 0. Tạo bầu trời sao
function createStars() {
    const starContainer = document.getElementById('stars-container');
    const starCount = window.innerWidth < 768 ? 80 : 200;
    
    for(let i=0; i<starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        
        starContainer.appendChild(star);
    }
}

// Tạo hiệu ứng mưa sao băng
function createShootingStars() {
    const container = document.getElementById('stars-container');
    // Tạo khoảng 6 ngôi sao băng rơi so le nhau
    for (let i = 0; i < 6; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'shooting-star';
        
        // Vị trí ngẫu nhiên, chủ yếu rải rác ở nửa trên màn hình (0-50vh) và rộng theo chiều ngang
        meteor.style.top = `${Math.random() * 50 - 10}vh`;
        meteor.style.left = `${Math.random() * 120}vw`; // Rộng hơn 100vw một chút để rớt từ mép vào
        
        // Random thời gian trễ để chúng không rơi cùng một lúc
        meteor.style.animationDelay = `${Math.random() * 8}s`;
        // Random tốc độ rơi
        meteor.style.animationDuration = `${Math.random() * 2 + 3}s`;
        
        container.appendChild(meteor);
    }
}

// Tạo hiệu ứng ban ngày (Hoa nắng và Chim bay)
function createDayEffects() {
    const dayBg = document.querySelector('.day-background');
    if (!dayBg) return;

    // 1. Tạo 25 đốm hoa nắng bay lơ lửng
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'day-particle';
        
        const size = Math.random() * 15 + 5;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`; 
        
        p.style.animationDuration = `${Math.random() * 10 + 10}s`;
        p.style.animationDelay = `${Math.random() * 10}s`;
        
        dayBg.appendChild(p);
    }

    // 2. Tạo 4 chú chim bay ngang qua màn hình
    // Sử dụng SVG thay cho Emoji để có thể tạo hiệu ứng vỗ cánh
    const birdSVG = `
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path class="wing wing-left" d="M5,20 Q15,5 20,20" />
            <path class="wing wing-right" d="M35,20 Q25,5 20,20" />
        </svg>
    `;

    for (let i = 0; i < 4; i++) {
        const b = document.createElement('div');
        b.className = 'bird';
        b.innerHTML = birdSVG;
        b.style.color = "rgba(71, 85, 105, 0.7)"; // Màu xám đen (Slate) mờ mờ cho cánh chim ở xa
        
        // Bay ở nửa trên của màn hình
        b.style.top = `${Math.random() * 40 + 5}vh`; 
        b.style.animationDuration = `${Math.random() * 20 + 20}s`; // Bay chầm chậm (20-40s)
        b.style.animationDelay = `${Math.random() * 15}s`;
        
        dayBg.appendChild(b);
    }
}

// 1. Tạo HTML động cho 30 chiếc nơ
function createBows() {
    for (let i = 1; i <= totalBows; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = `bow-wrapper wrapper-${i}`;
        
        // --- Chiếc nơ đặc biệt số 24 ---
        if (i === 24) {
            wrapper.classList.add('special-wrapper');
            wrapper.innerHTML = `
                <div class="bow special-bow bow-${i}" style="color: #FF3366;">
                    <div class="bow-number">24</div>
                    ${bowSVG}
                </div>
                
                <div class="certificate">
                    <div class="certificate-inner">
                        <h2>Chứng nhận Năng Lượng</h2>
                        <div class="subtitle">Dành tặng cho</div>
                        <div class="highlight-name">Đoàn Thị Thơm</div>
                        
                        <p>Gửi đến người chị đã luôn mạnh mẽ, năng động và kiên cường vượt qua mọi áp lực công việc. Chị luôn là nguồn lan tỏa năng lượng tích cực và hương "Thơm" rực rỡ đến mọi người xung quanh.</p>
                        
                        <div class="seal" style="color: #FF3366;">
                            ${bowSVG}
                        </div>
                    </div>
                </div>
                
                <div class="continue-scroll">
                    <div class="cute-decor">
                        <div class="mini-star">✦</div>
                        <div class="mini-bow" style="color: #ff6699;">${bowSVG}</div>
                        <div class="mini-star">✦</div>
                    </div>
                    <span>Vẫn còn những điều rực rỡ phía trước</span>
                </div>
            `;
            
            // Thêm các particles (hiệu ứng Confetti sặc sỡ)
            for(let j = 0; j < 60; j++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Đa dạng hình dáng: cánh hoa bay để tượng trưng cho hương "Thơm"
                const size = Math.random() * 10 + 6;
                
                particle.style.width = `${size * 1.5}px`;
                particle.style.height = `${size}px`;
                particle.style.borderRadius = "50% 0 50% 50%"; // Hình dáng cánh hoa rơi
                
                // Lấy màu ngẫu nhiên từ bảng màu rực rỡ
                particle.style.backgroundColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.transform = 'translate(-50%, -50%)';
                
                wrapper.appendChild(particle);
            }
        } 
        // --- Các chiếc nơ bình thường ---
        else {
            const color = vibrantColors[i % vibrantColors.length];
            // So le trái phải
            const align = i % 2 === 0 ? 'flex-start' : 'flex-end';
            
            // Trên điện thoại: Căn giữa tuyệt đối để chữ không bao giờ bị cắt 2 bên
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                wrapper.style.justifyContent = 'center';
                // Thêm một chút padding ngẫu nhiên để vẫn có sự sống động nhẹ nhàng
                wrapper.style.paddingLeft = `${Math.random() * 10 - 5}%`;
            } else {
                const padding = `${Math.random() * 15 + 15}%`; 
                wrapper.style.justifyContent = align;
                wrapper.style[align === 'flex-start' ? 'paddingLeft' : 'paddingRight'] = padding;
            }
            
            wrapper.innerHTML = `
                <div class="bow bow-${i}" style="color: ${color}">
                    <div class="bow-number">${i}</div>
                    ${bowSVG}
                    <div class="bow-text">${wishes[i-1]}</div>
                </div>
            `;
        }
        
        container.appendChild(wrapper);
    }
}

// 2. Thiết lập Animations bằng GSAP
function setupAnimations() {
    // --- Mặt trăng di chuyển theo Scroll ---
    gsap.to(".moon", {
        y: "150vh", // Trăng sẽ chìm dần xuống dưới khi cuộn
        x: "-40vw", // Và trôi dạt sang bên trái
        rotation: 30, // Xoay nhẹ nhàng
        ease: "none", // Chuyển động đều đặn
        scrollTrigger: {
            trigger: "#bows-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true // Đồng bộ chặt chẽ với thao tác cuộn chuột
        }
    });

    // --- Hero Animation ---
    gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // --- Phần 1 & 3: Các nơ từ 1-23 và 25-30 ---
    for (let i = 1; i <= totalBows; i++) {
        if (i === 24) continue;
        
        const bow = document.querySelector(`.bow-${i}`);
        const text = document.querySelector(`.bow-${i} .bow-text`);
        const wrapper = document.querySelector(`.wrapper-${i}`);
        
        const directionX = i % 2 === 0 ? -100 : 100;
        const rotation = i % 2 === 0 ? -20 : 20;
        
        // Animation xuất hiện mượt mà (Không dùng bounce)
        gsap.fromTo(bow, 
            { 
                x: directionX, 
                y: 80,
                opacity: 0, 
                rotation: rotation,
                scale: 0.8
            },
            {
                x: 0, 
                y: 0,
                opacity: 1, 
                rotation: 0,
                scale: 1,
                ease: "power3.out", // Smooth easing theo chuẩn Impeccable
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 90%",
                    end: "center center",
                    scrub: 1, 
                }
            }
        );

        if(text) {
            gsap.to(text, {
                opacity: 1,
                y: 15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "center 70%",
                    end: "center 50%",
                    scrub: true
                }
            });
        }
    }

    // --- Phần 2: CAO TRÀO - Chiếc nơ số 24 (The Morphing Experience) ---
    const wrapper24 = document.querySelector(".wrapper-24");
    const particles = document.querySelectorAll('.wrapper-24 .particle');
    
    // Đổi màu nền sâu thẳm hơn khi đến nơ 24
    ScrollTrigger.create({
        trigger: wrapper24,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => document.body.style.backgroundColor = '#05060a', // Tối đen như mực
        onLeaveBack: () => document.body.style.backgroundColor = 'var(--bg-color)',
        onLeave: () => document.body.style.backgroundColor = 'var(--bg-color)',
        onEnterBack: () => document.body.style.backgroundColor = '#05060a',
    });

    // Timeline chính cho phần pin
    const tl24 = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper24,
            start: "center center",
            end: "+=450%", // Kéo dài thời gian pin cho hiệu ứng cinematic
            pin: true,
            pinSpacing: false, // Tắt tính năng tự động đệm của GSAP vì đã dùng margin cứng
            scrub: 1,
        }
    });

    // Tính toán scale tối đa cho nơ 24 tùy theo màn hình (tránh bị tràn lố trên điện thoại)
    const maxBowScale = window.innerWidth < 768 ? 4 : 6;

    // Nơ 24 phóng to và mờ dần
    tl24.to(".bow-24", {
        scale: maxBowScale,
        opacity: 0,
        rotation: 45,
        duration: 1.5,
        ease: "power3.inOut" // Mượt mà, không dội (bounce)
    })
    
    // Bằng khen hiện ra (Sử dụng power3.out thay vì back.out)
    .to(".certificate", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
    }, "-=1.0") 
    
    // Confetti ánh sao bung ra rực rỡ
    .to(particles, {
        x: () => (Math.random() - 0.5) * window.innerWidth * 1.2,
        y: () => (Math.random() - 0.5) * window.innerHeight * 1.2,
        opacity: () => Math.random() * 0.8 + 0.2,
        scale: () => Math.random() * 1.5 + 0.5,
        rotation: () => Math.random() * 360,
        duration: 2.5,
        ease: "power3.out",
    }, "-=1.2")
    
    // Khoảng nghỉ để người dùng đọc hết Bằng khen
    .to({}, {duration: 2.0})
    
    // YÊU CẦU: "Mở ra sao thì đóng lại vậy"
    // Bằng khen thu nhỏ lại và mờ đi (Ngược lại chính xác với lúc mở)
    .to(".certificate", {
        opacity: 0,
        scale: 0.95, // Đúng với tỷ lệ gốc trong CSS
        duration: 1.2,
        ease: "power3.in",
        pointerEvents: "none"
    })
    
    // Hạt confetti hút ngược lại vào tâm
    .to(particles, {
        x: 0,
        y: 0,
        scale: 0.5,
        rotation: 0,
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut"
    }, "-=1.2")
    
    // Nơ số 24 khôi phục lại trạng thái ban đầu (thu nhỏ từ scale 6, xoay lại về 0)
    .to(".bow-24", {
        scale: 1,
        opacity: 1,
        rotation: 0, // Quan trọng: Trả lại góc xoay
        duration: 1.5,
        ease: "power3.inOut" // Cùng ease với lúc mở
    }, "-=1.0")
    
    // Dòng chữ hiện ra lộng lẫy ngay bên dưới nơ 24
    .fromTo(".continue-scroll", 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }
    )
    
    // Khoảng nghỉ để ngấm câu chữ
    .to({}, {duration: 1.5});
    
    // Bỏ hiệu ứng bay lên của continue-scroll, để nó dính liền với nơ 24 khi cuộn tiếp

    // --- Footer Animation ---
    gsap.to(".footer-content", {
        opacity: 1,
        y: -30,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            end: "center center",
            scrub: true
        }
    });

    // === Hiệu ứng Bình Minh (Mặt trời mọc từ từ theo thao tác cuộn) ===
    // Sẽ kích hoạt từ lúc bắt đầu cuộn nơ 25 cho đến kết thúc trang
    const startSunriseTrigger = document.querySelector(".wrapper-25");
    
    if (startSunriseTrigger) {
        gsap.to(".day-background", {
            opacity: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: startSunriseTrigger,
                start: "top bottom", // Trời bắt đầu sáng ngay khi nơ 25 vừa ló lên
                endTrigger: ".wrapper-28",
                end: "bottom bottom", // Bầu trời sáng hẳn khi cuộn đến nơ 28
                scrub: true
            }
        });

        gsap.to(".sun", {
            opacity: 1,
            bottom: "40vh", // Mặt trời bay cao lên
            ease: "power1.out",
            scrollTrigger: {
                trigger: startSunriseTrigger,
                start: "top bottom",
                endTrigger: ".footer",
                end: "bottom bottom", // Mặt trời vẫn cứ lên từ từ đến tận cuối trang
                scrub: true
            }
        });

        // Chuyển màu chữ của toàn bộ giao diện về màu tối để dễ đọc trên nền trời sáng
        gsap.to(document.documentElement, {
            "--text-muted": "#1e293b", // Slate cực đậm cho dễ đọc
            "--text-color": "#0f172a", // Xanh slate cực đậm cho chữ lớn (như footer)
            "--accent-color": "#e11d48", // Đỏ hồng rực rỡ cho highlight để nổi trên nền vàng
            ease: "power2.in", // Chuyển màu chậm ở đoạn đầu (lúc trời còn tối) và nhanh dần về sau
            scrollTrigger: {
                trigger: ".wrapper-26", // Bắt đầu đổi màu trễ hơn (từ nơ 26)
                start: "top bottom",
                endTrigger: ".wrapper-29",
                end: "bottom bottom", // Đổi xong ở nơ 29 khi trời đã sáng rực
                scrub: true
            }
        });
    }
}

// --- Các hàm Tương tác (Interactive) ---
function addInteractions() {
    // 1. Tương tác với Nơ
    const bows = document.querySelectorAll('.bow');
    bows.forEach(bow => {
        // Cải thiện UI: thêm cursor pointer
        bow.style.cursor = "pointer";
        
        bow.addEventListener('click', (e) => {
            // Hiệu ứng nhún nhảy (squish & bounce) cho nơ
            gsap.to(bow, {
                scale: 0.8,
                rotation: (Math.random() - 0.5) * 30, // Lắc lư nhẹ
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
            });
            
            // Bật hiệu ứng chữ nảy lên
            const text = bow.querySelector('.bow-text');
            if (text) {
                gsap.fromTo(text, 
                    { y: 0, scale: 1 }, 
                    { y: -15, scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)" }
                );
            }
            
            // Lấy màu của nơ để làm màu hạt
            const bowColor = bow.style.color || "#f8e19c";
            createBurst(e.clientX, e.clientY, bowColor, ['✨', '💖', '🌟', '🎀']);
        });
    });
    
    // 2. Tương tác với Mặt Trăng
    const moon = document.querySelector('.moon');
    if(moon) {
        moon.style.cursor = "pointer";
        moon.addEventListener('click', (e) => {
            gsap.to(moon, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
            createBurst(e.clientX, e.clientY, "#f8e19c", ['💤', '⭐', '🌙']);
        });
    }

    // 3. Tương tác với Mặt Trời
    const sun = document.querySelector('.sun');
    if(sun) {
        sun.style.cursor = "pointer";
        sun.addEventListener('pointerdown', (e) => {
            gsap.to(sun, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
            createBurst(e.clientX, e.clientY, "#f59e0b", ['☀️', '🌻', '✨']);
        });
    }
}

// Hàm tạo các hạt bung ra khi click
function createBurst(x, y, color, emojis) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        // Chọn emoji ngẫu nhiên
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.color = color;
        particle.style.fontSize = (Math.random() * 15 + 15) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = 9999;
        // Text shadow mỏng cho nổi
        particle.style.textShadow = "0 0 5px rgba(255,255,255,0.8)";
        
        document.body.appendChild(particle);
        
        // Tính toán quỹ đạo bay ngẫu nhiên theo hình nón hướng lên
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 40;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        gsap.to(particle, {
            x: tx,
            y: ty - 50, // Lực đẩy lên trên
            opacity: 0,
            rotation: (Math.random() - 0.5) * 360,
            scale: Math.random() * 1.5 + 0.5,
            duration: 0.8 + Math.random() * 0.4,
            ease: "power2.out",
            onComplete: () => {
                particle.remove();
            }
        });
    }
}

// Xử lý khi người dùng thay đổi kích thước cửa sổ để các hiệu ứng không bị lệch
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Khởi chạy
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createShootingStars(); // Kích hoạt mưa sao băng
    createDayEffects(); // Khởi tạo chim bay và hoa nắng ẩn sẵn
    createBows();
    setTimeout(() => {
        setupAnimations();
        addInteractions(); // Kích hoạt tương tác click
    }, 100);
});

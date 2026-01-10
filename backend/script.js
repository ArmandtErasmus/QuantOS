// Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", function(e){
    e.preventDefault();
    const email = this.querySelector("input[type='email']").value;
    const msg = document.getElementById("formMsg");

    if(email){
        
        msg.style.color = "#ffffff";
        msg.textContent = `Thanks! We'll notify you at ${email}.`;
        this.reset();
    } else {
        msg.style.color = "#ff2f2f";
        msg.textContent = "Please enter a valid email address.";
    }
});

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = document.querySelector('.hero').offsetHeight;

const chars = '$€£¥₹₩₽฿';
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * height;
}

function drawMatrix() {
    
    ctx.fillStyle = 'rgba(32,32,32,0.15)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'; 
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i]*fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i] ++;
    }
}

setInterval(drawMatrix, 60);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('.hero').offsetHeight;
});

const dynamicWrapper = document.querySelector(".dynamic-text-wrapper");

const messages = [
    {en: "Access global stocks, crypto, FX, and more.", es: "Accede a acciones, cripto, divisas y más a nivel mundial.", fr: "Accédez aux actions, crypto, FX et plus à l'échelle mondiale.", zh: "访问全球股票、加密货币、外汇及更多数据。"},
    {en: "Analyze 30+ years of multi-asset financial data.", es: "Analiza más de 30 años de datos financieros multiactivos.", fr: "Analysez plus de 30 ans de données financières multi-actifs.", zh: "分析30多年多资产金融数据。"},
    {en: "Download, filter, and integrate data seamlessly.", es: "Descarga, filtra e integra los datos sin problemas.", fr: "Téléchargez, filtrez et intégrez les données sans effort.", zh: "无缝下载、筛选和整合数据。"},
    {en: "Empowering researchers, analysts, and global teams.", es: "Empoderando a investigadores, analistas y equipos globales.", fr: "Renforcer les chercheurs, analystes et équipes mondiales.", zh: "为研究人员、分析师和全球团队赋能。"},
    {en: "Trusted financial insights for every market and region.", es: "Información financiera confiable para cada mercado y región.", fr: "Des informations financières fiables pour chaque marché et région.", zh: "为每个市场和地区提供可信赖的金融洞察。"}
];

let language = "en";
const languages = ["en", "es", "fr", "zh"];
let langIndex = 0;

// Pre-create span elements
dynamicWrapper.innerHTML = "";
messages.forEach(msg => {
    const span = document.createElement("span");
    span.classList.add("dynamic-text");
    span.textContent = msg[language];
    dynamicWrapper.appendChild(span);
});

const spans = dynamicWrapper.querySelectorAll(".dynamic-text");

function updateTextOnScroll() {
    const section = document.getElementById("globalHighlight");
    const scrollTop = window.scrollY;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
        const progress = (scrollTop - sectionTop) / sectionHeight;
        const index = Math.floor(progress * spans.length);

        spans.forEach((span, i) => {
            span.style.opacity = i <= index ? 1 : 0;
        });
    }
}

// Cycle languages every 6s
setInterval(() => {
    langIndex = (langIndex + 1) % languages.length;
    language = languages[langIndex];
    spans.forEach((span, i) => {
        span.textContent = messages[i][language];
    });
}, 6000);

window.addEventListener("scroll", updateTextOnScroll);
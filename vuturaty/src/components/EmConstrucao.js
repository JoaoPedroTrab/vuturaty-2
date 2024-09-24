import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useParallax from '../hooks/useParallax';

const EmConstrucao = () => {
  useScrollAnimation();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ email: '', nome: ''});
  const [countdown, setCountdown] = useState({});
  const toast = useRef(null);
  const bottomSectionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const launchDate = new Date('2024-12-02T13:00:00');
      const now = new Date();
      const difference = launchDate - now;

      setCountdown({
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      });
      setLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const validateName = (name) => {
    return name.trim() !== '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateName(formData.nome)) {
      alert("Por favor, insira um nome válido.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    handleSubscribe();
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Você foi inscrito com sucesso!', life: 3000 });
    setFormData({ nome: '', email: '', idade: '' });
  };

  const scrollToBottom = () => {
    bottomSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-[#1C226F] h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <Toast ref={toast} />
      <section className="flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#1C226F] min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C226F] via-transparent to-[#1C226F] pointer-events-none"></div>
        <div className="z-10 w-full text-center">
          <HeaderSection />
          <CountdownSection countdown={countdown} />
          <CampfireImage />
        </div>
        <button 
          onClick={scrollToBottom} 
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none focus:outline-none"
          aria-label="Rolar para baixo"
        >
          <i className="pi pi-arrow-down text-2xl text-white"></i>
        </button>
      </section>
      <section 
        ref={bottomSectionRef} 
        className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0f153f] via-[#0d1235] to-[#0a0e29] text-white min-h-screen overflow-hidden"
      >
        <AnimatedBackground />
          <div className="flex flex-col items-center"> 
            <NewsletterSection formData={formData} setFormData={setFormData} handleSubscribe={handleSubscribe} />
            <SocialSection />
          </div>
      </section>
    </div>
  );
};

const HeaderSection = () => (
  <div className="mb-6 animate-fade-in">
    <h1 className="text-4xl font-oswald font-bold mb-2 tracking-wide text-white">
      217° GRUPO ESCOTEIRO VUTURATY
    </h1>
    <p className="text-lg text-indigo-200 mb-4 leading-relaxed">
      Nosso site está em construção, mas o espírito escoteiro já está aceso!
    </p>
  </div>
);

const CountdownSection = ({ countdown }) => (
  <div className="flex flex-wrap justify-center space-x-4 mb-6 animate-fade-in">
    {Object.entries(countdown).map(([unit, value]) => (
      <div key={unit} className="text-center mb-4 sm:mb-0">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm uppercase text-indigo-200">{unit}</div>
      </div>
    ))}
  </div>
);

const CampfireImage = () => (
  <div className="w-full max-w-md mx-auto mb-6 animate-fade-in">
    <Image src="/campfire.png" alt="Escoteiros ao redor da fogueira" imageClassName="w-full rounded-lg transition duration-500 ease-in-out transform hover:scale-105" />
  </div>
);

const NewsletterSection = ({ formData, setFormData, handleSubscribe }) => (
  <div className="mb-12 animate-fade-in w-full max-w-md">
    <h2 className="text-3xl font-bold mb-4 text-center">Junte-se à nossa aventura!</h2>
    <p className="text-base text-indigo-200 mb-6 text-center">
      Inscreva-se para receber novidades, convites para eventos e informações exclusivas sobre o nosso grupo escoteiro!
    </p>
    <form onSubmit={handleSubscribe} className="space-y-4">
      <InputText
        value={formData.nome}
        onChange={(e) => setFormData({...formData, nome: e.target.value})}
        placeholder="Seu nome"
        className="w-full p-3 rounded-lg border-2 border-indigo-300 bg-indigo-900 text-white placeholder-indigo-300"
      />
      <InputText
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Seu e-mail"
        className="w-full p-3 rounded-lg border-2 border-indigo-300 bg-indigo-900 text-white placeholder-indigo-300"
      />
      <Button 
        type="submit" 
        label="Inscrever-se" 
        className="w-full p-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition duration-300"
      />
    </form>
  </div>
);


const SocialSection = () => (
  <div className="text-center animate-fade-in w-full max-w-md">
    <h2 className="text-3xl font-bold mb-4">Venha conhecer o movimento!</h2>
    <p className="text-base text-indigo-200 mb-4">
      Siga-nos nas redes sociais para ficar por dentro de tudo.
    </p>
    <div className="flex justify-center space-x-4 mb-6">
      <SocialIcon href="#" icon="pi pi-facebook" />
      <SocialIcon href="https://www.instagram.com/gevuturaty217/?igsh=cTBnejRxcHI1cG5y" icon="pi pi-instagram" />
    </div>
  </div>
);

const SocialIcon = ({ href, icon }) => (
  <a href={href} className="text-white hover:text-indigo-300 transition-colors duration-300" aria-label={`Visite nossa página no ${icon.split('-')[1]}`}>
    <i className={`${icon} text-3xl`} />
  </a>
);

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Partículas
    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default EmConstrucao;
import { Heart, Facebook, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Recurso": [
      "saiba mais",
      
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600"
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600"
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-600"
    },
    {
      icon: Mail,
      href: "#",
      label: "E-mail",
      color: "hover:text-primary"
    }
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white animate-pulse-soft" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Juntos pelo Autismo</h3>
                <p className="text-sm opacity-80">Juntos pela inclusão</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Dedicados a oferecer suporte especializado e recursos para pessoas 
              com autismo e suas famílias, construindo um futuro mais inclusivo.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-background/20 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-2 text-white">
              Receba Nossas Atualizações
            </h4>
            <p className="text-sm opacity-80 mb-4">
              Inscreva-se para receber dicas, recursos e novidades sobre autismo.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded-md bg-background/10 border border-background/20 text-white placeholder:text-background/60 focus:outline-none focus:border-background/40"
              />
              <button className="px-6 py-2 bg-gradient-hero rounded-md hover:opacity-90 transition-opacity duration-300 font-medium">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-8 border-t border-background/20">
          <div className="bg-background/5 p-4 rounded-lg">
            <h5 className="font-semibold text-white mb-2">🔒 Confidencialidade</h5>
            <p className="text-sm opacity-80">
              Todas as informações são tratadas com total sigilo e confidencialidade.
            </p>
          </div>
          <div className="bg-background/5 p-4 rounded-lg">
            <h5 className="font-semibold text-white mb-2">🏥 Profissionais</h5>
            <p className="text-sm opacity-80">
              Equipe multidisciplinar especializada em Transtorno do Espectro Autista.
            </p>
          </div>
          <div className="bg-background/5 p-4 rounded-lg">
            <h5 className="font-semibold text-white mb-2">📞 Emergência 24h</h5>
            <p className="text-sm opacity-80">
              Suporte disponível para situações que requerem atenção imediata.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm opacity-80">
            <p>&copy; {currentYear} Apoio Autismo. Todos os direitos reservados.</p>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
              Política de Privacidade
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
              Termos de Uso
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
              Acessibilidade
            </a>
          </div>
        </div>

        {/* Autism Awareness Message */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-hero px-6 py-3 rounded-full">
            <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
            <span className="text-sm font-medium text-white">
              Abril Azul - Mês de Conscientização do Autismo
            </span>
            <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
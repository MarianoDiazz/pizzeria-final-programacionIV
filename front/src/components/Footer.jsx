export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1 - Acerca de */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🍕</span>
              <h3 className="text-2xl font-bold">Bella Napoli</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Auténtica pizza italiana desde 2025. Ingredientes frescos, 
              recetas tradicionales y mucho amor en cada porción.
            </p>
          </div>

          {/* Columna 2 - Contacto */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-orange-400">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📍</span>
                <span>Av. Italia 1234, Concepción</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📞</span>
                <span>(381) 456-7890</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span>📧</span>
                <span>info@bellanapoli.com</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span>🕐</span>
                <span>Lun-Dom: 18:00 - 00:00</span>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Redes sociales */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-orange-400">Síguenos</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <span className="text-2xl">📘</span>
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <span className="text-2xl">📸</span>
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <span className="text-2xl">💬</span>
              </a>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-xl">
              <p className="text-sm font-semibold mb-2">¡Pedí por WhatsApp!</p>
              <a
                href="https://wa.me/5493814567890"
                className="bg-white text-red-600 px-4 py-2 rounded-full inline-flex items-center gap-2 font-bold hover:bg-gray-100 transition-colors"
              >
                <span>💬</span>
                <span>Enviar mensaje</span>
              </a>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© 2025 Bella Napoli. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
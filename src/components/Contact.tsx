import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Send, Copy, Check } from 'lucide-react'

const Contact = () => {
  const [copied, setCopied] = useState('')
  
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Principal',
      value: 'foro7.producciones@hoytmail.com',
      type: 'email'
    },
    {
      icon: Mail,
      label: 'Email Alternativo',
      value: 'foro7.arturocruz@gmail.com',
      type: 'email'
    },
    {
      icon: Mail,
      label: 'Email Corporativo',
      value: 'juanarturoruzarmenta@outlook.com',
      type: 'email'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'León, Guanajuato, México',
      type: 'location'
    }
  ]
  
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      value: 'ArturoCruzArm',
      url: 'https://github.com/ArturoCruzArm',
      color: 'hover:bg-gray-900 hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'juanarturocruzarmenta',
      url: 'https://linkedin.com/in/juanarturocruzarmenta',
      color: 'hover:bg-blue-600 hover:text-white'
    }
  ]
  
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            🌐 Contacto & Portafolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ¿Listo para colaborar? Contáctame para discutir tu próximo proyecto
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 group"
                    >
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {item.label}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">
                          {item.value}
                        </p>
                      </div>
                      
                      {item.type === 'email' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(item.value, item.label)}
                          className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors duration-300"
                        >
                          {copied === item.label ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          )}
                        </motion.button>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                Redes Profesionales
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group ${social.color}`}
                    >
                      <div className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {social.label}
                        </p>
                        <p className="font-medium">
                          {social.value}
                        </p>
                      </div>
                      
                      <Send className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
          
          {/* Professional Quote & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <motion.blockquote
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-6xl gradient-text mb-6">“</div>
                <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Apasionado por la tecnología y el arte visual. Disfruto resolver problemas complejos con código 
                  y capturar historias a través del lente. Mi meta es integrar ambas disciplinas para crear 
                  experiencias digitales memorables.
                </p>
                <div className="text-6xl gradient-text rotate-180">“</div>
              </motion.blockquote>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                Información Adicional
              </h3>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-white/5">
                  <span className="font-medium">Fecha de Nacimiento:</span>
                  <span>18 de octubre de 1993</span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-white/5">
                  <span className="font-medium">CURP:</span>
                  <span className="font-mono text-sm">CUAJ931018HGTRRN04</span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-white/5">
                  <span className="font-medium">RFC:</span>
                  <span className="font-mono text-sm">CUAJ931018F36</span>
                </div>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-8 rounded-2xl text-center bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20"
            >
              <h4 className="text-xl font-bold gradient-text mb-4">
                ¿Listo para colaborar?
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Reels y muestras creativas disponibles bajo solicitud
              </p>
              <motion.a
                href="mailto:foro7.producciones@hoytmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-full shadow-lg neon-glow hover:shadow-xl transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>Enviar Mensaje</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
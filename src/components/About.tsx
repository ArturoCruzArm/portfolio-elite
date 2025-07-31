import { motion } from 'framer-motion'
import { Code2, Palette, Rocket, Heart } from 'lucide-react'

const About = () => {

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            🚀 Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                Soy un <span className="gradient-text font-semibold">desarrollador Full-Stack especializado en Java y React</span>, 
                con sólida experiencia en automatización de procesos, backend empresarial y dirección creativa audiovisual.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                Estudiante activo en <span className="text-primary-500 font-semibold">UVEG</span>, con habilidades certificadas 
                en redes, programación, DevOps básico y edición multimedia.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Desde los <span className="text-primary-500 font-semibold">12 años</span> dirijo 
                <span className="gradient-text font-semibold"> Producciones Foro 7</span>, combinando lo técnico con lo artístico 
                para crear soluciones integrales y experiencias visuales memorables.
              </p>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl border-l-4 border-primary-500"
            >
              <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-4">
                "Apasionado por la tecnología y el arte visual. Disfruto resolver problemas complejos con código 
                y capturar historias a través del lente."
              </p>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Mi meta: integrar ambas disciplinas para crear experiencias digitales memorables
                </span>
              </div>
            </motion.blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <Code2 className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Backend Expert</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Java Spring Boot, optimización SQL +80%, automatización con jobs y triggers
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <Palette className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Productor Multimedia</h3>
              <p className="text-gray-600 dark:text-gray-400">
                150+ eventos sociales, edición 4K con Adobe Suite, fotografía profesional
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <Rocket className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Emprendedor</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fundador de Producciones Foro 7 desde 2012, gestión integral de proyectos
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
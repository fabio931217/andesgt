SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `andesgt_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(145) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Nombre del producto',
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'Descripción del producto',
  `precio` double DEFAULT NULL COMMENT 'Precio del producto',
  `state` int DEFAULT '1' COMMENT '1 activo - 0 eliminado',
  `created_at` datetime DEFAULT NULL COMMENT 'Fecha de creación',
  `updated_at` datetime DEFAULT NULL COMMENT 'Ultima fecha de actualización',
  `deleted_at` datetime DEFAULT NULL COMMENT 'Fecha de eliminación',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(145) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Titulo de la tarea',
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'Descripción de la tare porgramada',
  `id_estado` int DEFAULT '1' COMMENT 'Estado actual de la tarea ( Culminada o Sin terminar )',
  `fecha_vence` date DEFAULT NULL COMMENT 'Fecha en la que vence la tarea',
  `state` int DEFAULT '1' COMMENT '1 activo 0 inactivo',
  `created_at` datetime DEFAULT NULL COMMENT 'Fecha de creación',
  `updated_at` datetime DEFAULT NULL COMMENT 'Fecha de actualización',
  `deleted_at` datetime DEFAULT NULL COMMENT 'Fecha de eliminación',
  PRIMARY KEY (`id`),
  KEY `id_estado` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_estados`
--

DROP TABLE IF EXISTS `tareas_estados`;
CREATE TABLE IF NOT EXISTS `tareas_estados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `state` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `tareas_estados`
--

INSERT INTO `tareas_estados` (`id`, `nombre`, `state`) VALUES
(1, 'Sin terminar', 1),
(2, 'Culminada', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `tareas_estados` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

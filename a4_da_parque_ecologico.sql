-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: vl23934.dinaserver.com:3306
-- Tiempo de generación: 20-05-2022 a las 20:22:27
-- Versión del servidor: 10.1.48-MariaDB-0+deb9u2
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `a4_da_parque_ecologico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `biologos`
--

CREATE TABLE `biologos` (
  `dni` varchar(9) NOT NULL,
  `claveAcceso` varchar(255) NOT NULL,
  `fechaTitulacion` varchar(10) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `provincia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `biologos`
--

INSERT INTO `biologos` (`dni`, `claveAcceso`, `fechaTitulacion`, `direccion`, `provincia`) VALUES
('12345678Z', '$2y$10$esFZoH1iF/9pgUUqd2h.TuinPnAKfbtCUI9dguYW4gJP9bl15cJXK', '2022-01-31', 'Av Jazz 25', 'Pontevedra'),
('19057299M', '$2y$10$0Urnt8OWhPvYy05K1hrJnuqmqZm6/2VwDRWaH1LkUJnC7T3iSbi.e', '2022-03-04', 'Av Piano 25 - 4B - 36207', 'Pontevedra'),
('28985648J', '$2y$10$K9isVt3Yv.IXl5KCtjkFyezSq3FyQ6uUWlE4TvGqq5HK7/Ogi4X7m', '2022-02-10', 'C Instituto', 'Pontevedra'),
('49609656J', '$2y$10$Q4uILxGBUGnG/CNSoxEzxO0Vz9ZmfkVguC8i3SpgPNw8.2TsrqJvC', '2022-02-10', 'C Instituto', 'Pontevedra'),
('52992826K', '$2y$10$lLKDwVlt6Cvr0yfdOhwtJusBLxkfdnFeo1JwZwjZmNMZnWBufYV5W', '2022-02-03', 'C Instituto 23', 'Pontevedra'),
('67224417V', '$2y$10$fx.645tLsZ2x3QfBlLZkW.KrAZRKIoO62Wy5/tJd3fpsQqMHs11YC', '2022-02-17', 'Av Vigo 25 4B 36207', 'Pontevedra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `fecha` tinytext NOT NULL,
  `idInvitado` int(11) NOT NULL,
  `especie` varchar(50) NOT NULL,
  `comentario` text NOT NULL,
  `idRespuesta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especies`
--

CREATE TABLE `especies` (
  `id` int(11) NOT NULL,
  `especie` varchar(50) NOT NULL,
  `reino` varchar(50) NOT NULL,
  `clase` varchar(50) NOT NULL,
  `orden` varchar(50) NOT NULL,
  `familia` varchar(50) NOT NULL,
  `periodoMigratorio` varchar(50) NOT NULL,
  `caracteristicas` text NOT NULL,
  `poblacion` int(11) DEFAULT NULL,
  `imagenes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especies`
--

INSERT INTO `especies` (`id`, `especie`, `reino`, `clase`, `orden`, `familia`, `periodoMigratorio`, `caracteristicas`, `poblacion`, `imagenes`) VALUES
(1, 'Garza gris', 'Animalia', 'Aves', 'Pelicaniformes', 'Ardeidae', 'Invierno', 'Es un ave grande, que mide de 90 a 100 cm de altura,â€‹ con una longitud corporal de 84 a 102 cm,â€‹ una envergadura de alas de 1,75 a 1,95 m14â€‹ y un peso de 1 a 2 kg. Su plumaje es principalmente gris en las partes superiores y gris blanquecino en las inferiores. Los adultos tienen la cabeza y parte superior del cuello blancos, con franjas superciliares negras que se prolongan en un penacho trasero delgado, y una lÃ­nea veteada negruzca azulada a lo largo del cuello. Presentan dos manchas negras en los hombros que se extienden por los flancos. Tienen un pico fuerte rosa-amarillento, brillante cuando son adultos y cuya coloraciÃ³n se hace mÃ¡s intensa en la Ã©poca del celo. Tienen las plumas escapulares alargadas, al igual que las de la base del cuello. Los inmaduros tienen toda la cabeza gris y carecen de las oscuras de la cabeza, y su penacho trasero es gris oscuro. Su largo cuello suele estar retraÃ­do en forma de ese (S), y las alas arqueadas.12â€‹ El iris de sus ojos es amarillo y sus largas patas son parduzcas.\r\n\r\nSu llamada principal es un graznido de tipo &quot;fraaank&quot;, pero emite una variedad de sonidos guturales roncos en sus colonias de crÃ­a. Los machos emiten una llamada especial de aviso para animar a la hembra a unÃ­rsele al nido, y ambos emiten varios tipos de llamadas de saludo antes de emparejarse. Los machos emiten una &quot;schaah&quot; alto para expulsar a otras aves de su nido y un &quot;gogogo&quot; suave para expresar ansiedad, como cuando se acerca un depredador o un humano anda cerca de su colonia.', NULL, '[\"garzagris0.jpg\",\"garzagris1.jpg\",\"garzagris2.jpg\"]'),
(2, 'Zorro rojo', 'Animalia', 'Mammalia', 'Carnivora', 'Canidae', 'No', 'El zorro comÃºn o zorro rojo (Vulpes vulpes), tambiÃ©n llamado raposo o raboso, es una especie de mamÃ­fero de la familia cÃ¡nidos, de distribuciÃ³n holÃ¡rtica, aunque tambiÃ©n fue introducido en Australia en el siglo XIX.â€‹ Es un animal silencioso y muy cauteloso, que caza sobre todo por la noche. Durante el dÃ­a permanece oculto entre los matorrales o en sus madrigueras, excavadas en parajes secos y escondidos, a menudo entre las rocas, los barrancos herbosos y las espesuras.\r\n\r\nSu nombre cientÃ­fico, Vulpes vulpes, una tautologÃ­a de la palabra latina vulpes, que significa &#039;zorro&#039;. Su coloraciÃ³n mÃ¡s corriente en la naturaleza es el pardo rojizo, aunque existen individuos total o parcialmente melÃ¡nicos, de color casi negro o gris. Estos Ãºltimos se llaman zorros plateados y se crÃ­an en cautividad para peleterÃ­a.\r\n\r\nEl zorro comÃºn es la especie de zorro mÃ¡s abundante en el hemisferio norte, donde puede vivir en casi cualquier ecosistema, ya sean bosques caducifolios, praderas, estepas, la tundra alpina o la taiga. Es un generalista capaz de coexistir con especies mÃ¡s especializadas de zorros como el zorro Ã¡rtico (Alopex lagopus). El zorro rojo es capaz de sobrevivir en zonas urbanizadas y densamente pobladas por el hombre.\r\n\r\nEl zorro estÃ¡ presente en la mitologÃ­a de muchas culturas y tambiÃ©n aparece en innumerables cuentos, fÃ¡bulas y pelÃ­culas generalmente representando la astucia y la inteligencia.', NULL, '[\"zorrorojo0.jpg\",\"zorrorojo1.jpg\",\"zorrorojo2.jpg\"]'),
(3, 'CastaÃ±o', 'Plantae', 'Magnoliosida', 'Fagales', 'Fagaceae', 'No', 'El castaÃ±o (Castanea sativa) es un Ã¡rbol que pertenece a la familia de las fagÃ¡ceas, cuyo fruto, la castaÃ±a, es comestible y fue una importante fuente alimenticia, en particular en algunas regiones del sur de Europa.\r\n\r\nÃrboles de hasta 25-30 m, de tronco derecho, corto y grueso (hasta 2 m de diÃ¡metro) y de corteza lisa, cenicienta o pardusca hasta los 15-20 aÃ±os, despuÃ©s castaÃ±o-oscura y agrietada longitudinalmente con ramitas glabras, castaÃ±o-verdosas\r\n\r\nYemas ovoideas, obtusas, las terminales ausentes. Hojas de 8-22 por 4,5-8 cm, oblanceoladas, agudas, de base redondeada ligeramente asimÃ©trica, serradas, con dientes agudos, glabras por el haz y un poco pubescentes a lo largo de los nervios por el envÃ©s.\r\n\r\nFlores masculinas en amentos de hasta 20 cm, con periantio trÃ­mero doble, y con 8-12 estambres exertos rodeando un ovario estÃ©ril rudimentario (pistilodio); las femeninas con 7-9 estilos en el Ã¡pice del ovario, Ã¡pice cubierto de pelos sedosos adpresos que se extienden hasta la base de los estilos, y persistirÃ¡n en el aquenio derivado de dicho ovario.\r\n\r\nEl fruto es una cÃºpula subglobosa cubierta de largas espinas ramificadas y algo pelosas (calibio) que mide entre 5-11 cm de diÃ¡metro, de dehiscencia por 4 valvas y que contiene usualmente 2-3 aquenios que son las castaÃ±as propiamente dicho. Dichos aquenios, aunque se puede tambiÃ©n interpretar como una &quot;nuez&quot;, en el sentido botÃ¡nico del tÃ©rmino, miden unos 2-4cm; tienen forma abombada hacÃ­a el exterior y la cara interior plana (cuando hay mÃ¡s de 2, ambos lados de los centrales adoptan una forma aplanada). La base, convexa o planoconvexa, de cada uno presenta una ancha cicatriz (Hilo) grisÃ¡cea que corresponde a su fijaciÃ³n en la cÃºpula exterior, y conserva en el Ã¡pice el pistilo peludo y tambiÃ©n sus estilos. El endocarpo, que es la &quot;piel&quot;/cÃ¡scara exterior integra, aunque puede presentar dehiscencia por ruptura, tiene color pardo oscuro (&quot;castaÃ±o&quot;) con bandas longitudinales algo mÃ¡s oscuras; es brillante, prÃ¡cticamente liso con imperceptibles surcos irregulares longitudinales desde el hilo (excluido) casi hasta el Ã¡pice. Su cara interna es abundantemente peluda/aterciopelada, con largos y sinuosos pelos blanquecinos. Dicho endocarpo rodea la semilla, que es ruminada, sin endospermo y envuelta por un tegumento (epispermo) de color canela, irregular e Ã­ntimamente pegado a los cotiledones, penetrando en las fisuras e irregularidades de sus superficies. Dicha semilla es la parte comestible de la castaÃ±a.', NULL, '[\"casta\\u00f1o0.jpg\",\"casta\\u00f1o1.jpg\",\"casta\\u00f1o2.jpg\"]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especimenes`
--

CREATE TABLE `especimenes` (
  `codigoRegistro` varchar(20) NOT NULL,
  `registrador` varchar(9) NOT NULL,
  `especie` varchar(100) NOT NULL,
  `peso` int(11) NOT NULL,
  `dimensiones` varchar(20) NOT NULL,
  `caracteristicas` varchar(1000) DEFAULT NULL,
  `fechaRegistro` varchar(10) NOT NULL,
  `imagenes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitados`
--

CREATE TABLE `invitados` (
  `id` int(11) NOT NULL,
  `usuario` varchar(10) NOT NULL,
  `claveAcceso` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `invitados`
--

INSERT INTO `invitados` (`id`, `usuario`, `claveAcceso`, `mail`) VALUES
(1, 'vir', '$2y$10$RGoQ/W29nIk7u/YHLmCSg.vTH.Q1WZazPNyXIYCQ5UHmXZvYuJ.TW', 'vir@vir.vir');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `dni` varchar(9) DEFAULT NULL,
  `nombreApellido` varchar(50) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `idInvitado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `dni`, `nombreApellido`, `mail`, `telefono`, `idInvitado`) VALUES
(1, NULL, 'Virginia Garcia', 'vir@vir.vir', '', 1),
(2, '19057299M', 'Nadia Garcia', 'nadia@bio.bio', '987412365', NULL),
(3, '12345678Z', 'Vir Vir', 'vir@bio.bio', '987456321', NULL),
(4, '67224417V', 'Diego Garcia', 'diego@bio.bio', '987456321', NULL),
(5, '52992826K', 'Triana Triana', 'triana@bio.bio', '874569123', NULL),
(6, '28985648J', 'Rosa Laura', 'rosa@bio.bio', '789456123', NULL),
(7, '49609656J', 'Laura Rosa', 'laura@bio.bio', '789456123', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros_torreta`
--

CREATE TABLE `registros_torreta` (
  `id` int(11) NOT NULL,
  `idTorreta` int(11) NOT NULL,
  `chip` varchar(10) NOT NULL,
  `fechasEntrada` varchar(10) NOT NULL,
  `fechasSalida` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idComentario` int(11) NOT NULL,
  `dniBiologo` varchar(9) NOT NULL,
  `respuesta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torretas`
--

CREATE TABLE `torretas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `localizacion` varchar(50) NOT NULL,
  `alcance` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `torretas`
--

INSERT INTO `torretas` (`id`, `nombre`, `localizacion`, `alcance`) VALUES
(1, 'Norte', 'Norte', 'Radio 250 m'),
(2, 'Sur', 'Sur', 'Radio 250 m'),
(3, 'Este', 'Este', 'Radio 250 m'),
(4, 'Oeste', 'Oeste', 'Radio 250 m'),
(5, 'Nordeste', 'Nordeste', 'Radio 375 m'),
(6, 'Nordoeste', 'Nordoeste', 'Radio 375 m'),
(7, 'Sudeste', 'Sudeste', 'Radio 375 m'),
(8, 'Sudoeste', 'Sudoeste', 'Radio 375 m');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `biologos`
--
ALTER TABLE `biologos`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idInvitado` (`idInvitado`),
  ADD KEY `especie` (`especie`),
  ADD KEY `idRespuesta` (`idRespuesta`);

--
-- Indices de la tabla `especies`
--
ALTER TABLE `especies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `especie` (`especie`);

--
-- Indices de la tabla `especimenes`
--
ALTER TABLE `especimenes`
  ADD PRIMARY KEY (`codigoRegistro`),
  ADD KEY `registrador` (`registrador`),
  ADD KEY `especie` (`especie`);

--
-- Indices de la tabla `invitados`
--
ALTER TABLE `invitados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD UNIQUE KEY `usuario` (`usuario`) USING BTREE;

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `idInvitado` (`idInvitado`);

--
-- Indices de la tabla `registros_torreta`
--
ALTER TABLE `registros_torreta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chip` (`chip`),
  ADD KEY `idTorreta` (`idTorreta`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idComentario` (`idComentario`),
  ADD KEY `dniBiologo` (`dniBiologo`),
  ADD KEY `dniBiologo_2` (`dniBiologo`);

--
-- Indices de la tabla `torretas`
--
ALTER TABLE `torretas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especies`
--
ALTER TABLE `especies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `invitados`
--
ALTER TABLE `invitados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `registros_torreta`
--
ALTER TABLE `registros_torreta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idInvitado`) REFERENCES `invitados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `especimenes`
--
ALTER TABLE `especimenes`
  ADD CONSTRAINT `especimenes_ibfk_1` FOREIGN KEY (`especie`) REFERENCES `especies` (`especie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `especimenes_ibfk_2` FOREIGN KEY (`registrador`) REFERENCES `biologos` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`idInvitado`) REFERENCES `invitados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personas_ibfk_2` FOREIGN KEY (`dni`) REFERENCES `biologos` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registros_torreta`
--
ALTER TABLE `registros_torreta`
  ADD CONSTRAINT `registros_torreta_ibfk_1` FOREIGN KEY (`chip`) REFERENCES `especimenes` (`codigoRegistro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registros_torreta_ibfk_2` FOREIGN KEY (`idTorreta`) REFERENCES `torretas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idComentario`) REFERENCES `comentarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`dniBiologo`) REFERENCES `biologos` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

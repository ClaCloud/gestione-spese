<?php

$sql = array(
  "
  CREATE TABLE IF NOT EXISTS $username"."_debcred (
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    Tipo tinyint(1) NOT NULL DEFAULT 1,
    Persona VARCHAR(30) NOT NULL,
    Motivo VARCHAR(30),
    Valuta decimal(10,2) NOT NULL,
    Data datetime NOT NULL
  ) ENGINE=InnoDB;
  ",
  "
  CREATE TABLE IF NOT EXISTS $username"."_categorie (
    id int(11) NOT NULL AUTO_INCREMENT,
    categoria varchar(30) NOT NULL,
    IDicona int(11) NOT NULL,
    abilitato tinyint(1) NOT NULL DEFAULT 1,
    position INT(10) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY IDicona (IDicona)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ",
  "
  CREATE TABLE IF NOT EXISTS $username"."_metodipagamento (
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(30) NOT NULL,
    totale decimal(10,2) DEFAULT 0,
    abilitato tinyint(1) NOT NULL DEFAULT 1,
    visibile BOOLEAN NOT NULL DEFAULT TRUE
  ) ENGINE=InnoDB;
  ",
  "
  CREATE TABLE IF NOT EXISTS $username"."_spazi (
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    position INT(10) NOT NULL DEFAULT 0,
    Nome varchar(50) NOT NULL,
    IDicona int(11) NOT NULL,
    Abilitato tinyint(1) NOT NULL DEFAULT 1,
    Bilancio decimal(10,2) NOT NULL DEFAULT 0,
    KEY IDicona (IDicona)
  ) ENGINE=InnoDB;
  ",
  "
  CREATE TABLE IF NOT EXISTS $username"."_movimenti (
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    IDSpazio int(11) DEFAULT NULL,
    Data date NOT NULL,
    Motivo VARCHAR(30) NOT NULL,
    IDMetodo int(11) NOT NULL,
    Soldi decimal(10,2) NOT NULL,
    IDCategoria int(11) NOT NULL,
    Appunti VARCHAR(255) NOT NULL,
    KEY IDMetodo (IDMetodo),
    KEY IDCategoria (IDCategoria),
    KEY IDSpazio (IDSpazio)
  ) ENGINE=InnoDB;
  ",
  "
  ALTER TABLE $username"."_movimenti
    ADD CONSTRAINT $username"."_movimenti_ibfk_1 FOREIGN KEY (IDMetodo) REFERENCES $username"."_metodipagamento (id),
    ADD CONSTRAINT $username"."_movimenti_ibfk_2 FOREIGN KEY (IDCategoria) REFERENCES $username"."_categorie (id),
    ADD CONSTRAINT $username"."_movimenti_ibfk_3 FOREIGN KEY (IDSpazio) REFERENCES $username"."_spazi (id);
  ",
  "
  ALTER TABLE $username"."_spazi
    ADD CONSTRAINT $username"."_spazi_ibfk_1 FOREIGN KEY (IDicona) REFERENCES icons (id);
  ",
  "
  CREATE TABLE IF NOT EXISTS $username"."_annunci (
    idAnnuncio int(11) NOT NULL,
    visible tinyint(1) NOT NULL DEFAULT '0',
    KEY idAnnuncio (idAnnuncio)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  ",
  "
  ALTER TABLE $username"."_annunci
    ADD CONSTRAINT $username"."_annunci_ibfk_1 FOREIGN KEY (idAnnuncio) REFERENCES annunci (id);
  ",
  "
  INSERT INTO $username"."_categorie (categoria, IDicona) VALUES
  ('Altro', 1),
  ('Assicurazioni', 2),
  ('Bar & Ristoranti', 3),
  ('Casa & Utenze', 4),
  ('Cibo & Spesa', 5),
  ('Cure Sanitarie & Farmacia', 6),
  ('Educazione', 7),
  ('Multimedia & Elettronica', 8),
  ('Shopping', 9),
  ('Risparmio & Investimenti', 10),
  ('Sottoscrizioni & Donazioni', 11),
  ('Spese Aziendali', 12),
  ('Tasse & Multe', 13),
  ('Tempo libero & Intrattenimento', 14),
  ('Trasporto & Auto', 15),
  ('Cura Personale', 16),
  ('Viaggi & Vacanze', 17),
  ('Famiglia & Amici', 18),
  ('Stipendio', 19),
  ('Entrata', 20)
  ",
  "
  INSERT INTO $username"."_metodipagamento (metodo, totale) VALUES
  ('Contanti', 0)
  ",
	"
	CREATE TABLE IF NOT EXISTS `$username"."_speseric` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`motivo` VARCHAR(30) NOT NULL,
		`costo` DECIMAL(10,2) NOT NULL,
		`periodo` TINYINT(1) NOT NULL DEFAULT '0',
		`rinnovo` DATETIME NOT NULL,
		PRIMARY KEY (`id`)
	) ENGINE = InnoDB;
	"
);
for ($i = 0; $i < count($sql); $i++) {
  if ($conn->query($sql[$i]) === FALSE){
    echo "<br>Error creating database tables or insert: " . $conn->error;
  }
}

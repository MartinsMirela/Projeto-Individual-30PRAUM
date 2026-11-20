CREATE DATABASE 30praum;
USE 30praum;

CREATE TABLE usuario (
  idusuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(80),
  email VARCHAR(100),
  senha VARCHAR(100)
);

CREATE TABLE artista (
  idartista INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45)
);

CREATE TABLE respostas_quiz (
  idrespostas_quiz INT PRIMARY KEY AUTO_INCREMENT,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  p1 VARCHAR(60),
  p2 VARCHAR(60),
  p3 VARCHAR(60),
  p4 VARCHAR(60),
  p5 VARCHAR(60),
  plataforma VARCHAR(30),
  canal VARCHAR(30),
  faixa_etaria VARCHAR(20),
  fk_usuario INT,
  FOREIGN KEY (fk_usuario) REFERENCES usuario(idusuario)
);

CREATE TABLE pontuacao (
  artista_id INT,
  resposta_id INT,
  pontos INT,
  PRIMARY KEY (artista_id, resposta_id),
  FOREIGN KEY (artista_id) REFERENCES artista(idartista),
  FOREIGN KEY (resposta_id) REFERENCES respostas_quiz(idrespostas_quiz)
);

INSERT INTO artista (nome) VALUES ('Matuê'), ('Teto'), ('Brandão'), ('Wiu');

SELECT a.nome, SUM(p.pontos) AS total
FROM pontuacao p
JOIN artista a ON a.idartista = p.artista_id
GROUP BY a.nome
ORDER BY total DESC;

SELECT a.nome, p.pontos
FROM pontuacao p
JOIN artista a ON a.idartista = p.artista_id
JOIN respostas_quiz r ON r.idrespostas_quiz = p.resposta_id
WHERE r.fk_usuario = 1
  AND r.data_hora = (SELECT MAX(data_hora) FROM respostas_quiz WHERE fk_usuario = 1);
  
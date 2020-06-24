from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    s1 = Serie(nome = "Control Z", temporada = 1, 
    genero = "Drama Adolescente", status = "Em produção", 
    classificacao_indicativa = 18)
    s2 = Serie(nome = "V Wars", temporada = 1, 
    genero = "Terror e Ficção Científica", status = "Cancelada",
    classificacao_indicativa = 16)
    s3 = Serie(nome = "The Vampire Diaries", temporada = 8, 
    genero = "Drama, Fantasia e Romance", status = "Encerrada",
    classificacao_indicativa = 14)
    s4 = Serie(nome = "Grey's Anatomy", temporada = 16, 
    genero = "Drama Médico", status = "Em produção",
    classificacao_indicativa = 14)
    s5 = Serie(nome = "Blindspot", temporada = 5, 
    genero = "Ficção Policial", status = "Encerrada",
    classificacao_indicativa = 14)  

    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.commit()
    
    print(s1.json())
    print(s2.json())
    print(s3.json())
    print(s4.json())
    print(s5.json())
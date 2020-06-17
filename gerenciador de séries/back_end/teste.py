from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    s1 = Serie(nome = "Control Z", temporada = 1, 
    genero = "Drama adolescente")
    s2 = Serie(nome = "V Wars", temporada = 1, 
    genero = "Terror e Ficção Científica")        
    
    db.session.add(s1)
    db.session.add(s2)
    db.session.commit()
    
    print(s1.json())
    print(s2.json())
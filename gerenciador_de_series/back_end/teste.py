from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    em1 = Emissora(nome = "Netflix", pais = "Estados Unidos", ano = 1997)
    em2 = Emissora(nome = "The CW", pais =  "Estados Unidos", ano = 2006)
    em3 = Emissora(nome = "abc", pais = "Estados Unidos", ano = 1943)
    em4 = Emissora(nome = "NBC", pais ="Estados Unidos", ano = 1926)
    em5 = Emissora(nome = "CBS", pais = "Estados Unidos", ano = 1927)
    em6 = Emissora(nome = "HBO", pais = "Estados Unidos", ano = 1972)

    s1 = Serie(nome = "Control Z", temporada = 1, 
    genero = "Drama Adolescente", status = "Em produção", 
    classificacao_indicativa = 18, emissora_id = 1)
    s2 = Serie(nome = "V Wars", temporada = 1, 
    genero = "Ficção Científica e Terror", status = "Cancelada",
    classificacao_indicativa = 16, emissora_id = 1)
    s3 = Serie(nome = "The Vampire Diaries", temporada = 8, 
    genero = "Drama, Fantasia e Romance", status = "Encerrada",
    classificacao_indicativa = 14, emissora_id = 2)
    s4 = Serie(nome = "Grey's Anatomy", temporada = 16, 
    genero = "Drama Médico", status = "Em produção",
    classificacao_indicativa = 14, emissora_id = 3)
    s5 = Serie(nome = "Blindspot", temporada = 5, 
    genero = "Ficção Policial", status = "Encerrada",
    classificacao_indicativa = 14, emissora_id = 4)
    s6 = Serie(nome = "Spinning Out", temporada = 1, 
    genero = "Drama", status = "Cancelada",
    classificacao_indicativa = 14, emissora_id = 1)
    s7 = Serie(nome = "CSI: NY", temporada = 9, 
    genero = "Investigação e Suspense", status = "Encerrada",
    classificacao_indicativa = 14, emissora_id = 5)
    s8 = Serie(nome = "Euphoria", temporada = 1, 
    genero = "Drama Adolescente", status = "Em produção",
    classificacao_indicativa = 18, emissora_id = 6)

    e1 = Elenco(nome = "Ana Valeria Becerril", personagem = "Sofia Herrera",
    categoria = "Protagonista", serie_id = 1)
    e2 = Elenco(nome = "Ian Somerhalder", personagem = "Dr. Luther Swann",
    categoria = "Protagonista", serie_id = 2)
    e3 = Elenco(nome = "Nina Dobrev", personagem = "Elena Gilbert",
    categoria = "Protagonista", serie_id = 3)
    e4 = Elenco(nome = "Ellen Pompeo", personagem = "Meredith Grey",
    categoria = "Protagonista", serie_id = 4)
    e5 = Elenco(nome = "Jaimie Alexander", personagem = "Jane Doe",
    categoria = "Protagonista", serie_id = 5)
    e6 = Elenco(nome = "Kaya Scodelario", personagem = "Kat Baker",
    categoria = "Protagonista", serie_id = 6)
    e7 = Elenco(nome = "Gary Sinise", personagem = "Mac Taylor",
    categoria = "Protagonista", serie_id = 7)
    e8 = Elenco(nome = "Zendaya", personagem = "Rue Bennett",
    categoria = "Protagonista", serie_id = 8)

    db.session.add(em1)
    db.session.add(em2)
    db.session.add(em3)
    db.session.add(em4)
    db.session.add(em5)
    db.session.add(em6)

    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.add(s6)
    db.session.add(s7)
    db.session.add(s8)

    db.session.add(e1)
    db.session.add(e2)
    db.session.add(e3)
    db.session.add(e4)
    db.session.add(e5)
    db.session.add(e6)
    db.session.add(e7)
    db.session.add(e8)

    db.session.commit()
    
    print(em1.json())
    print(em2.json())
    print(em3.json())
    print(em4.json())
    print(em5.json())
    print(em6.json())

    print(s1.json())
    print(s2.json())
    print(s3.json())
    print(s4.json())
    print(s5.json())
    print(s6.json())
    print(s7.json())
    print(s8.json())

    print(e1.json())
    print(e2.json())
    print(e3.json())
    print(e4.json())
    print(e5.json())
    print(e6.json())
    print(e7.json())
    print(e8.json())
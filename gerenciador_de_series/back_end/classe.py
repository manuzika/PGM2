from config import *
import enum

class Emissora(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    pais = db.Column(db.String(254))
    ano = db.Column(db.Integer)

    def __str__(self):
        return str(self.id)+", " + self.nome + ", " +\
            self.pais + ", " + str(self.ano)

    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "pais": self.pais,
            "ano": self.ano,
        })

class Serie(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    temporada = db.Column(db.Integer)
    genero = db.Column(db.String(254))
    status = db.Column(db.String(254))
    classificacao_indicativa = db.Column(db.Integer)
    emissora_id = db.Column(db.Integer, db.ForeignKey(Emissora.id))
    emissora = db.relationship("Emissora")

    def __str__(self):
        s = f"Série {self.nome}"
        if self.emissora_id != None:
            s += f"exibida originalmente por {self.nome} localizada em {self.pais}"
            return s

    def json(self):
        if self.emissora_id is None:
            return ({
                "id": self.id,
                "nome": self.nome,
                "temporada": self.temporada,
                "genero": self.genero,
                "status": self.status,
                "classificacao_indicativa": self.classificacao_indicativa
            })
        else:
            return ({
                "id": self.id,
                "nome": self.nome,
                "temporada": self.temporada,
                "genero": self.genero,
                "status": self.status,
                "classificacao_indicativa": self.classificacao_indicativa,
                "emissora": self.emissora.json()
            })

class Elenco(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    personagem = db.Column(db.String(254))
    categoria = db.Column(db.String(254))
    serie_id = db.Column(db.Integer, db.ForeignKey(Serie.id), nullable=False)
    serie = db.relationship("Serie")

    def __str__(self):
        return str(self.id)+", " + self.nome + ", " +\
            self.personagem + ", " + self.categoria

    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "personagem": self.personagem,
            "categoria": self.categoria,
            "serie": self.serie.json()
        })
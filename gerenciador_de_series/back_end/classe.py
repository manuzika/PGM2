from config import *
import enum

class Produtora(db.Model):

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

class Status(enum.Enum):
    CANCELADA = 1
    EM_PRODUCAO = 2
    ENCERRADA = 3

class Serie(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    temporada = db.Column(db.Integer)
    genero = db.Column(db.String(254))
    status = db.Column(db.Enum(Status))
    classificacao_indicativa = db.Column(db.Integer)
    produtora_id = db.Column(db.Integer, db.ForeignKey(Produtora.id))
    produtora = db.relationship("Produtora")

    def __str__(self):
        s = f"Série {self.nome}"
        if self.produtora_id != None:
            s += f"produzida por {self.nome} localizada em {self.pais}"
            return s

    def json(self):
        if self.produtora_id is None:
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
                "produtora": self.produtora.json()
            })

class Categoria(enum.Enum):
    PROTAGONISTA: 1
    COADJUVANTE: 2
    SECUNDARIO: 3

class Elenco(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    personagem = db.Column(db.String(254))
    categoria = db.Column(db.Enum(Categoria))
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
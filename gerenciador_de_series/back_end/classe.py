from config import *
import enum

class Status(enum.Enum):
    cancelada = "Cancelada"
    em_produção = "Em produção"
    encerrada = "Encerrada"

class Serie(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    temporada = db.Column(db.Integer)
    genero = db.Column(db.String(254))
    status = db.Column(db.Enum(Status))
    classificacao_indicativa = db.Column(db.Integer)
    origem_id = db.Column(db.Integer, db.ForeignKey(Origem.id))
    origem = db.relationship("Origem")

    def __str__(self):
        s = f"Essa série é original"
        if self.origem_id != None:
            s += f"essa série é baseada em {self.titulo} de {self.autor}"
            return s

    def json(self):
        if self.origem_id is None:
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
                "origem": self.origem.json()
            })

class TipoOrigem(enum.Enum):
    livro = "Livro"
    filme = "Filme"
    serie = "Série"

class Origem(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.Enum(TipoOrigem))
    titulo = db.Column(db.String(254))
    ano = db.Column(db.Integer)
    autor = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+", " + self.tipo + ", " +\
            self.titulo + ", " + str(self.ano) + ", " +\
            self.autor

    def json(self):
        return ({
            "id": self.id,
            "tipo": self.tipo,
            "titulo": self.titulo,
            "ano": self.ano,
            "autor": self.autor,
        })

class Categoria(enum.Enum):
    protagonista: "Protagonista"
    coadjuvante: "Coadjuvante"
    secundario: "Secundário"

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
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta raíz (para verificar que anda)
@app.get("/")
def read_root():
    return {"mensaje": "Servidor FastAPI funcionando correctamente 🍕"}

# Modelo de producto
class Producto(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    imagen_url: str

# Endpoint para agregar productos
@app.post("/productos")
def agregar_producto(producto: Producto):
    conn = sqlite3.connect("pizzeria.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            descripcion TEXT,
            precio REAL,
            imagen_url TEXT
        )
    """)
    cursor.execute(
        "INSERT INTO productos (nombre, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)",
        (producto.nombre, producto.descripcion, producto.precio, producto.imagen_url),
    )
    conn.commit()
    conn.close()
    return {"mensaje": "Producto agregado correctamente"}

# Endpoint para listar productos
@app.get("/productos")
def obtener_productos():
    conn = sqlite3.connect("pizzeria.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM productos")
    productos = cursor.fetchall()
    conn.close()
    return {"productos": productos}

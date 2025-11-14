from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Pizzería Don Mariano 🍕")

# En desarrollo:
# FRONT: http://localhost:5173
# En producción agregaremos el dominio de Vercel
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # "https://tu-front.vercel.app",  # luego lo agregamos
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, get_db

# Crea todas las tablas automáticamente
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Pizzería Don Mariano 🍕")

# CORS para conectar con React
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    return {"mensaje": "Servidor FastAPI funcionando correctamente 🍕"}


# ---------- CATEGORIAS ----------
@app.get("/categorias", response_model=list[schemas.Categoria])
def listar_categorias(db: Session = Depends(get_db)):
    return crud.get_categorias(db)


@app.post("/categorias", response_model=schemas.Categoria)
def crear_categoria(categoria: schemas.CategoriaCreate, db: Session = Depends(get_db)):
    return crud.create_categoria(db, categoria)


# ---------- PRODUCTOS ----------
@app.get("/productos", response_model=list[schemas.Producto])
def listar_productos(db: Session = Depends(get_db)):
    return crud.get_productos(db)


@app.post("/productos", response_model=schemas.Producto)
def crear_producto(producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    return crud.create_producto(db, producto)


@app.delete("/productos/{producto_id}")
def eliminar_producto(producto_id: int, db: Session = Depends(get_db)):
    producto = crud.delete_producto(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"mensaje": "Producto eliminado"}


# ---------- PEDIDOS ----------
@app.get("/pedidos", response_model=list[schemas.Pedido])
def listar_pedidos(db: Session = Depends(get_db)):
    return crud.get_pedidos(db)


@app.post("/pedidos", response_model=schemas.Pedido)
def crear_pedido(pedido: schemas.PedidoCreate, db: Session = Depends(get_db)):
    return crud.create_pedido(db, pedido)


@app.put("/pedidos/{pedido_id}/estado")
def cambiar_estado_pedido(
    pedido_id: int,
    data: schemas.EstadoUpdate,
    db: Session = Depends(get_db)
):
    pedido = crud.actualizar_estado_pedido(db, pedido_id, data.estado)
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    return pedido

# 🔥 ACTUALIZAR PRODUCTO
@app.put("/productos/{id}", response_model=schemas.Producto)
def actualizar_producto(id: int, data: schemas.ProductoBase, db: Session = Depends(get_db)):
    producto = db.query(models.Producto).filter(models.Producto.id == id).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    # Actualizar campos
    producto.nombre = data.nombre
    producto.descripcion = data.descripcion
    producto.precio = data.precio
    producto.id_categoria = data.id_categoria
    producto.imagen_url = data.imagen_url
    producto.disponible = data.disponible

    db.commit()
    db.refresh(producto)

    return producto
# Gestor-Inventario-JS

-- Crear base de datos con nombre más general
CREATE DATABASE GestionInventario;
GO

USE GestionInventario;
GO

-- Tabla Roles
CREATE TABLE Rol (
    IdRol INT PRIMARY KEY IDENTITY(1,1),
    NombreRol NVARCHAR(50) NOT NULL UNIQUE
);

-- Tabla Usuarios
CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL,
    Correo NVARCHAR(150) NOT NULL UNIQUE,
    Contrasena NVARCHAR(256) NOT NULL,
    IdRol INT NOT NULL,
    CONSTRAINT FK_Usuario_Rol FOREIGN KEY (IdRol) REFERENCES Rol(IdRol)
);

-- Tabla Proveedores
CREATE TABLE Proveedor (
    IdProveedor INT PRIMARY KEY IDENTITY(1,1),
    NombreProveedor NVARCHAR(150) NOT NULL,
    Contacto NVARCHAR(100),
    Telefono NVARCHAR(20),
    Correo NVARCHAR(150)
);

-- Tabla Sucursales
CREATE TABLE Sucursal (
    IdSucursal INT PRIMARY KEY IDENTITY(1,1),
    NombreSucursal NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(200)
);

-- Tabla Productos
CREATE TABLE Producto (
    IdProducto INT PRIMARY KEY IDENTITY(1,1),
    NombreProducto NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(500),
    Precio DECIMAL(10, 2) NOT NULL,
    IdProveedor INT,
    CONSTRAINT FK_Producto_Proveedor FOREIGN KEY (IdProveedor) REFERENCES Proveedor(IdProveedor)
);

-- Tabla Inventario
CREATE TABLE Inventario (
    IdInventario INT PRIMARY KEY IDENTITY(1,1),
    IdProducto INT NOT NULL,
    IdSucursal INT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad >= 0),
    CONSTRAINT FK_Inventario_Producto FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
    CONSTRAINT FK_Inventario_Sucursal FOREIGN KEY (IdSucursal) REFERENCES Sucursal(IdSucursal),
    CONSTRAINT UQ_Inventario UNIQUE (IdProducto, IdSucursal)
);

-- Tabla MovimientoInventario
CREATE TABLE MovimientoInventario (
    IdMovimiento INT PRIMARY KEY IDENTITY(1,1),
    IdProducto INT NOT NULL,
    IdSucursal INT NOT NULL,
    IdUsuario INT NOT NULL,
    TipoMovimiento NVARCHAR(20) NOT NULL CHECK (TipoMovimiento IN ('Ingreso', 'Salida', 'Devolución')),
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    FechaMovimiento DATETIME NOT NULL DEFAULT GETDATE(),
    Comentarios NVARCHAR(500),
    CONSTRAINT FK_Movimiento_Producto FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
    CONSTRAINT FK_Movimiento_Sucursal FOREIGN KEY (IdSucursal) REFERENCES Sucursal(IdSucursal),
    CONSTRAINT FK_Movimiento_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);

ALTER TABLE Producto
ADD 
    Stock INT NOT NULL DEFAULT 0,
    FechaIngreso DATETIME NOT NULL DEFAULT GETDATE(),
    Imagen VARBINARY(MAX) NULL,
    Marca NVARCHAR(100) NULL;

UPDATE Producto
SET FechaIngreso = CAST(FechaIngreso AS DATE);

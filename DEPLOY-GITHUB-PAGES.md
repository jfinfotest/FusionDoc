# Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages. Sigue estos pasos para configurar tu repositorio:

## 📋 Requisitos Previos

- Una cuenta de GitHub
- Un repositorio público (GitHub Pages gratuito solo funciona con repositorios públicos)

## 🚀 Pasos para el Despliegue

### 1. Crear un Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. **Importante**: Asegúrate de que el repositorio sea **público**
3. No inicialices con README, .gitignore o licencia (ya que subirás archivos existentes)

### 2. Subir tu Proyecto

```bash
# Inicializar git en tu carpeta del proyecto
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: FusionDoc project ready for GitHub Pages"

# Agregar el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Source** (Fuente), selecciona **GitHub Actions**
5. ¡Listo! GitHub detectará automáticamente el workflow que ya está configurado

### 4. Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un workflow llamado "Deploy to GitHub Pages" ejecutándose
3. Una vez completado (marca verde ✅), tu sitio estará disponible en:
   ```
   https://TU-USUARIO.github.io/TU-REPOSITORIO/
   ```

## 🔧 Archivos de Configuración Incluidos

- **`.github/workflows/deploy.yml`**: Workflow de GitHub Actions para despliegue automático
- **`.nojekyll`**: Evita el procesamiento de Jekyll (ya incluido en tu proyecto)
- **`_config.yml`**: Configuración adicional para GitHub Pages
- **`github-pages-config.js`**: Script que maneja las rutas base automáticamente
- **`index.html`**: Página principal con rutas relativas correctas

## 🔄 Actualizaciones Automáticas

Cada vez que hagas `git push` a la rama `main`, GitHub Pages se actualizará automáticamente con los nuevos cambios.

## 🛠️ Personalización del Dominio (Opcional)

Si tienes un dominio personalizado:

1. En **Settings > Pages**
2. En **Custom domain**, ingresa tu dominio
3. Crea un archivo `CNAME` en la raíz con tu dominio:
   ```
   echo "tudominio.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

## 📝 Notas Importantes

- El despliegue puede tardar unos minutos en estar disponible
- Los cambios en GitHub Pages pueden tardar hasta 10 minutos en propagarse
- Asegúrate de que tu repositorio sea público para usar GitHub Pages gratuito
- Si tienes problemas, revisa la pestaña **Actions** para ver los logs del despliegue

## 🆘 Solución de Problemas

### ⚠️ Error: "The site configured at this address does not contain the requested file"

**Este es el error más común al configurar GitHub Pages.**

- **Síntoma**: Mensaje de error indicando que no se encuentra `index.html`
- **Causa**: Los archivos no están en la raíz del repositorio
- **Solución**: Ver el archivo `README-GITHUB-PAGES-SETUP.md` para instrucciones detalladas paso a paso

### El sitio no carga correctamente o muestra "No se pudo obtener el archivo local index.md"
- **Problema de rutas base**: Este error ocurre cuando GitHub Pages sirve el sitio desde un subdirectorio (ej: `usuario.github.io/repositorio/`)
- **Solución incluida**: El archivo `github-pages-config.js` detecta automáticamente si está en GitHub Pages y ajusta las rutas
- Verifica que todas las rutas en `index.html` sean relativas (sin `/` al inicio)
- Asegúrate de que el archivo `.nojekyll` esté presente
- Confirma que `github-pages-config.js` se carga antes que la aplicación principal

### El workflow falla
- Revisa los logs en la pestaña **Actions**
- Verifica que el repositorio tenga los permisos correctos para GitHub Pages

### 404 en GitHub Pages
- Asegúrate de que el archivo `index.html` esté en la raíz del repositorio
- Verifica que GitHub Pages esté configurado para usar "GitHub Actions" como fuente

### Problemas de carga de archivos docs/
- El script `github-pages-config.js` intercepta las peticiones fetch y XMLHttpRequest para corregir las rutas automáticamente
- Si persisten los problemas, verifica en las herramientas de desarrollador del navegador que las rutas se estén resolviendo correctamente

---

¡Tu sitio de documentación FusionDoc estará listo para ser compartido con el mundo! 🌍
module.exports = function(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           //espacios por -
        .replace(/[^\w\-]+/g, '')       //quitar caracteres especiales
        .replace(/\-\-+/g, '-')         //quitar dobles - por un -
        .replace(/^-+/, '')             //quiter - del inicio de string
        .replace(/-+$/g, '')            //quiter - del final de string
}
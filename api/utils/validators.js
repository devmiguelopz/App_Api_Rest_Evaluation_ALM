exports.isEmail = value => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
exports.isCellPhone = value => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(value);
exports.isFullName = value => /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/.test(value);
exports.isIdentificationDocument = value => /^\d{8}(?:[-\s]\d{4})?$/.test(value);

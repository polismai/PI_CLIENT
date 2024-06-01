const validate = (input) => {

  let rawErrors = {
    name: [],
    background_image: [],
    description: [],
    platforms: [],
    released: [],
    rating: [],
    genres: []
  };

  if (!input.name.trim()) {
    rawErrors.name.push("Debe introducir un nombre");
  } else if (!/^[a-zA-Z\s-]+$/.test(input.name)) {
    rawErrors.name.push("El nombre no puede contener simbolos");
  }

  if (!input.background_image.trim()) {
    rawErrors.background_image.push("Debe proporcionar una URL de imagen");
  } else if (!isValidUrl(input.background_image)) {
    rawErrors.background_image.push("La URL de la imagen no es válida");
  }

  if (!input.description.trim()) {
    rawErrors.description.push("Debe proporcionar una descripción");
  }

  if (!input.platforms.length) {
    rawErrors.platforms.push("Debe especificar al menos una plataforma");
  }

  if (!input.released.trim()) {
    rawErrors.released.push("Debe especificar una fecha de lanzamiento");
  } else if (!isValidDate(input.released)) {
    rawErrors.released.push("La fecha de lanzamiento no es válida");
  }

  if (!input.rating.trim()) {
    rawErrors.rating.push("Debe especificar un rating.");
  } else {
    const rating = parseFloat(input.rating);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      rawErrors.rating.push("El rating debe ser un número entre 0 y 10");
    } else if (!/^(\d{1,2}(\.\d{1,2})?)$/.test(input.rating)) {
      rawErrors.rating.push("El rating puede tener hasta dos decimales");
    }
  }

  if (!input.genres.length) {
    rawErrors.genres.push("Debe seleccionar al menos un género");
  }

  return rawErrors;
};

const isValidUrl = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
};

const isValidDate = (dateString) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(dateString);
};

export default validate;
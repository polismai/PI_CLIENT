const validate = (input) => {

    let rawErrors = {
        name: [],
        image: [],
        description: [],
        platforms: [],
        released: [],
        rating: []
    }
    if (input.name === '') {
        rawErrors.name.push("Debe introducir un nombre")
    }

    if (!/^[a-zA-Z\s-]+$/.test(input.name)) {
        rawErrors.name.push("No puede contener simbolos")
    }

    return rawErrors;
};

export default validate;
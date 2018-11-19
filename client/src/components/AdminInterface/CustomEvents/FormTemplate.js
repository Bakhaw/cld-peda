const FormTemplate = [
  {
    label: 'Dates',
    placeholder: 'JJ/MM/AAAA - JJ/MM/AAAA',
    helperText: '(Si dates début - fin sont identiques, mettre quand même les deux dates)',
    multiline: false,
    name: 'dates', // ? === the key in { this.state }
    value: 'dates' // ? pareil
  },
  {
    label: 'Titre',
    placeholder: "Révisions pour l'examen",
    helperText: 'Description de votre évènement personnalisé',
    multiline: true,
    name: 'title', // ? === the key in { this.state }
    value: 'title' // ? pareil
  }
];

export default FormTemplate;

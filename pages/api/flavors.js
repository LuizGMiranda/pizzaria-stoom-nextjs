export default (req, res) => {
  res.status(200).json({
    data: [
      {
        id: 1,
        title: "Calabresa",
        description: "muçarela, calabresa e cebola",
        value: "10,00",
        recommended: true,
      },
      {
        id: 2,
        title: "Portuguesa",
        description: "presunto, ovos, muçarela e ervilha",
        value: "10,00",
        recommended: false,
      },
      {
        id: 3,
        title: "Atum",
        description: "atum sólido e cebola",
        value: "11,00",
        recommended: false,
      },
      {
        id: 4,
        title: "Baiana",
        description:
          "calabresa moída, ovos, pimenta, cebola e um toque de parmesão",
        value: "12,00",
        recommended: false,
      },
      {
        id: 5,
        title: "Brócolis",
        description:
          "brócolis, bacon crocante e uma leve camada de muçarela ou catupiry",
        value: "10,00",
        recommended: false,
      },
      {
        id: 6,
        title: "Frango Catupiry",
        description: "frango, milho e catupiry",
        value: "15,00",
        recommended: false,
      },
    ],
  });
};

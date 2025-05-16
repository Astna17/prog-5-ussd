const menuData = {
  main: {
    firstMainPage: {
      options: {
        '1': 'Mvola',
        '2': 'Rappelle moi',
        '3': 'SOS crédit',
        '4': 'Services YAS',
        '5': 'Promotion',
        '6': 'Produits et divertissement',
        '7': 'Banque et micro-finances',
        '0': 'Page suivante'
      },
      nextPage: 'secondMainPage'
    },
    secondMainPage: {
      options: {
        '8': 'Mon identité',
        '9': 'Configurer mon mobile',
        '00':'Page précédente'
      },
      prevPage: 'firstMainPage'
    }
  },
  mvola: {
    firstMvolaPage: {
      options: {
        '1': 'Acheter crédit ou offre YAS',
        '2': 'Transférer argent(vers toute destination)',
        '3': 'Mvola crédit ou épargne',
        '4': 'Retrait argent',
        '#': 'Page suivante'
      },
      nextPage: 'secondMvolaPage'
    },
    secondMvolaPage: {
      options: {
        '5': 'Paiement facture & partenaires',
        '6': 'Mon compte',
        '7': 'Recevoir de l\'argent',
        '8': 'Banque et micro-finances',
        '*': 'Page précédente',
        '**': 'Menu principal'
      },
      prevPage: 'firstMvolaPage'
    }
  }
};
export default menuData;

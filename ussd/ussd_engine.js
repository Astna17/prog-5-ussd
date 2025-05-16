import { createInterface } from 'readline';
import menuData from './menu_data.js';

class UssdEngine {
  constructor() {
    this.currentContext = 'main';
    this.currentPage = 'firstMainPage';
    this.mvolaPage = 'firstMvolaPage';
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.timeoutId = null;
  }

  start() {
    this.displayMenu(this.currentPage);
  }

  displayMenu(page) {
    console.clear();
    const context = this.currentContext;
    const options = menuData[context][page].options;

    console.log(`===== ${context === 'main' ? 'Menu Principal' : 'Menu Mvola'} (Page ${page}) =====`);

    const keys = Object.keys(options).filter(k => k !== '0');
    keys.sort((a, b) => Number(a) - Number(b));

    for (const key of keys) {
      console.log(`${key}. ${options[key]}`);
    }

    if (options['0']) {
      console.log(`0. ${options['0']}`);
    }

    this.timeoutId = setTimeout(() => {
      console.log('\n[!] Problème de connexion ou code IHM non valide.');
      this.rl.close();
    }, 5000);

    this.rl.question('\nFait votre choix : ', (input) => {
      clearTimeout(this.timeoutId);
      this.handleChoice(input);
    });
  }

  handleChoice(choice) {
    const context = this.currentContext;
    const pageData = menuData[context][context === 'main' ? this.currentPage : this.mvolaPage];
    const isMain = context === 'main';

    const actions = {
      main: {
        '0': () => {
          if (pageData.nextPage) {
            this.currentPage = pageData.nextPage;
            this.displayMenu(this.currentPage);
          } else this.invalidChoice();
        },
        '00': () => {
          if (pageData.prevPage) {
            this.currentPage = pageData.prevPage;
            this.displayMenu(this.currentPage);
          } else this.invalidChoice();
        },
        '1': () => {
          this.currentContext = 'mvola';
          this.mvolaPage = 'firstMvolaPage';
          this.displayMenu(this.mvolaPage);
        }
      },
      mvola: {
        '#': () => {
          if (pageData.nextPage) {
            this.mvolaPage = pageData.nextPage;
            this.displayMenu(this.mvolaPage);
          } else this.invalidChoice();
        },
        '*': () => {
          if (pageData.prevPage) {
            this.mvolaPage = pageData.prevPage;
            this.displayMenu(this.mvolaPage);
          } else this.invalidChoice();
        },
        '**': () => {
          this.currentContext = 'main';
          this.currentPage = 'firstMainPage';
          this.displayMenu(this.currentPage);
        }
      }
    };

    if (pageData.options[choice]) {
      const contextActions = actions[context] || {};
      if (contextActions[choice]) {
        contextActions[choice]();
      } else {
        console.log(`\nVous avez choisi : ${pageData.options[choice]}`);
        this.rl.close();
      }
    } else {
      this.invalidChoice();
      setTimeout(() => this.displayMenu(isMain ? this.currentPage : this.mvolaPage), 3000);
    }
  }

  invalidChoice() {
    console.log('\nChoix invalide. Réessayez!');
  }
}

export default UssdEngine;

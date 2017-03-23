import angular from 'angular';
import '../style/bootstrap.min.css';
import '../style/app.css';


let app = () => { 
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};




class AppCtrl {

  constructor(RandomWordsService) {
      this.randomWordsService = RandomWordsService;
      this.pseudo = '';
      this.hiddenWord =  '' ; 
      this.letters = [] ; 
      this.alphabet  = this.randomWordsService.getAlphabet(); 

      this.nbCurrentFailure = 0 ; 

      this.maximumAllowedFailure  = this.randomWordsService.getMaximumAllowedFailure(); 

      this.isGameOver = this.randomWordsService.isGameOver()  ; 

      this.gameEndStatus = '' ; 

      this.showAlphabet= false ; 


  }

  getRandomWordFromPseudo() {
   
       this.hiddenWord =  this.randomWordsService.generateWordFromPseudo(this.pseudo)  ; 

       this.letters = this.getLettersFromWord(this.hiddenWord) ; 
       console.log(this.letters) ; 


  }

  getLettersFromWord (word) {
    var arr  = word.split("") ; 
    return arr.map(function (e) {
      return   {letter : e , show :false}
    }) 
  }

  getNbDisplayedLetters () {
    var nbdisplayed = 0 ; 
     this.letters.forEach(function (l)  {
          if(l.show  == true )  nbdisplayed ++ ; 
     })

     return  nbdisplayed ; 
  }

  disableLetter (index,  searchedLetter) {

     this.checkIfExist(searchedLetter ) ; 

    if( !this.isGameOver && this.gameEndStatus !== 'win' && this.alphabet[index].state == true  )
    {
      this.alphabet[index].state = false ; 
      this.nbCurrentFailure++ ;
    //

     this.isGameOver = this.randomWordsService.isGameOver(this.nbCurrentFailure) ;  
    }

     this.gameEndStatus = this.randomWordsService.getGameStatus(this.hiddenWord.length ,  this.getNbDisplayedLetters()) ; 

     
  }

  checkIfExist(searchedLetter){

    var letter  =  this.letters.filter(function ( l ) {
          if (l.letter === searchedLetter ) 
            l.show = true ; 
    })[0];

  }


  resetGame () {

      this.randomWordsService =  RandomWordsService;
      this.pseudo = '';
      this.hiddenWord =  '' ; 
      this.letters = [] ; 
        this.alphabet =  this.alphabet.map(function (a) {
        return  {letter : a.letter , state : true}
      })

      this.nbCurrentFailure = 0 ; 

      this.maximumAllowedFailure  = this.randomWordsService.getMaximumAllowedFailure(); 

      this.isGameOver = false ; 

      this.gameEndStatus = '' ; 

      this.showAlphabet= false ; 
  }


}
AppCtrl.$inject = ['RandomWordsService'];






class RandomWordsService {

  constructor() {
      this.words = [
                     'JOHN' , 
                    'ELISA', 
                    'MARK', 
                    'DANA', 
                    'ELODIE',
                    'PIERRE', 
                    'DEMOIE'
                    ];

      this.MaximumAllowedFailure = this.words.length + 3 ; 

      this.gameStatus = '' ;

      this.alphabet  = [
                      {letter : 'A' , state : true }, 
                       {letter : 'B' , state : true } ,
                       {letter : 'C' , state : true } ,
                       {letter : 'D' , state : true } ,
                       {letter : 'E' , state : true } ,
                       {letter : 'F' , state : true } ,
                       {letter : 'G' , state : true } ,
                       {letter : 'H' , state : true } ,
                       {letter : 'I' , state : true } ,
                       {letter : 'J' , state : true } ,
                       {letter : 'K' , state : true } ,
                       {letter : 'L' , state : true } ,
                       {letter : 'M' , state : true } ,
                       {letter : 'N' , state : true } ,
                       {letter : 'O' , state : true } ,
                       {letter : 'P' , state : true } ,
                       {letter : 'Q' , state : true } ,
                       {letter : 'R' , state : true } ,
                       {letter : 'S' , state : true } ,
                       {letter : 'T' , state : true } ,
                       {letter : 'U' , state : true } ,
                       {letter : 'V' , state : true } ,
                       {letter : 'W' , state : true } ,
                       {letter : 'X' , state : true } ,
                       {letter : 'Y' , state : true } ,
                       {letter : 'Z' , state : true } ,
                   
                      ] ; 
  }


  generateWordFromPseudo (pseudo) {
          var  index  = Math.floor(Math.random() * this.words.length)
          
          return  this.words[index]; 
  }

  getAlphabet () {
    return  this.alphabet ; 
  }

  getMaximumAllowedFailure () {
    return  this.MaximumAllowedFailure ; 
  }

  isGameOver(nbfailure) {
    console.log("failure" + nbfailure + " Max" + this.MaximumAllowedFailure ) 
    if(nbfailure > this.MaximumAllowedFailure  )
    {
      
      return  true ; 

    } 
    return  false ; 
  }


  getGameStatus ( nbWordLetters , nbdisplayedLetters) {
    console.log("word" + nbWordLetters  + "  displayed "+  nbdisplayedLetters) ; 
    if (nbWordLetters ===   nbdisplayedLetters ) 
    return  'win' ; 
    else if (nbWordLetters  > nbdisplayedLetters) 
      return  'loose' ; 
    else return 'progress'; 
  }


}















const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .service('RandomWordsService', RandomWordsService);

export default MODULE_NAME;
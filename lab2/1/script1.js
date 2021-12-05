var result = window.prompt("Tekst1","Tekst2");
console.log(result, typeof(result));
// oba argumenty są opcjonalne, pierwszy zostanie wsywietlony jako wiadomosc dla uzytkownika, a drugi jako wartosc domyslna inputu
// od uzytkownika
// gdy zostanie wprowadzony:
// liczba -> wprowadzona liczba typu string
// tekst -> wprowadzony tekst typu string
// nic i ok -> <empty string> typu string
// coś i anuluj -> null typu object

function wypisz() {
    var text = document.forms[0].elements.pole_tekstowe.value;
    var number = document.forms[0].elements.pole_liczbowe.value;
    alert(text + " " + typeof(text) + "\n" + number + " " + typeof(number));
}
// we wszystkich przypadkach zostaje wyswietlona podana wartosc typu string
# Slope — configurazione tariffe min-stay

Property ID: `2e5ba507-0d51-4d20-95e2-899fdb2d8aae`  
Backoffice: [booking.slope.it](https://booking.slope.it)

## Problema segnalato

Per soggiorni di **4 notti** (es. 5–9 luglio, **2 ospiti**) compaiono tariffe con vincolo **minimo 5 o 7 notti** (anche non rimborsabili), oltre a standard / NR / last minute.

Il sito React **non filtra** i piani tariffari Slope: dopo il widget in `SlopeReservationsWidget.tsx` tutto è gestito dal PMS.

## Checklist backoffice

Per ogni piano “**Tariffa minimo X notti**” (es. 5 notti, 7 notti):

1. Aprire **Tariffe / Rate plans** per la property.
2. Verificare **Minimum stay** e **Maximum stay** / regole di applicabilità.
3. Impostare che il piano sia visibile **solo** se la durata del soggiorno rispetta il minimo (es. tariffa 5 notti → da 5 notti in su; tariffa 7 → da 7 in su).
4. Per soggiorni più corti: lasciare visibili solo **Standard**, **Non refundable** (se prevista) e **Last minute** (promo).
5. Controllare **restrizioni per tipologia** (M2/M3/M4 mare/giardino) se alcune tariffe sono legate a room type errati.
6. Salvare e attendere propagazione (di solito pochi minuti).

## Test di accettazione

| Campo | Valore |
|-------|--------|
| Ospiti | 2 |
| Notti | 4 |
| Date esempio | 5–9 luglio (stesso anno di test) |

**Atteso:** solo tariffe coerenti con 4 notti (+ eventuale promo last minute).  
**Non atteso:** tariffe “minimo 5 notti” o “minimo 7 notti”.

## Note per il cliente

- Dopo la configurazione, ripetere lo stesso scenario e salvare screenshot **prima/dopo**.
- Il copy sulla pagina `/prenota` spiega che le tariffe dipendono dalla durata del soggiorno e che Slope propone la configurazione adatta (2/3/4 posti, mare o giardino).

/* State properties */
export const KEYS = "keys";
export const PRIVATE_KEY = "privKey";
export const SYMMETRIC_KEYS = "symKeys";
export const IS_ENCRYPTED = "isEncrypted";

/* Encryption parameters */
export const AES_KEY_BYTES = 32;
export const RSA_KEY_BITS = 1024;
export const RSA_EXPONENT = 0x10001;

/* General tags used for parsing computer generated messages */
export const TAG_PREFIX = "» ";
export const VAL_PREFIX = "\n";
export const CHECK_STR = ">>>>>>";

/* Tags that identify encryption related messages */
export const PK_TAG = "PUBLIC RSA KEY";
export const SK_TAG = "ENCRYPTED AES KEY";
export const CT_TAG = "CIPHER TEXT";
export const DSBL_TAG = "DISABLE AES";
export const AD_TAG = "Download Mazenger for encrypted chats, custom memes, auto responses, themes etc. " +
  "Visit http://www.newmeta.de/mazenger - it's free and open source!";

/* Icon replacements that simplify encryption messages for the user */
export const PK_ICON = "🔑 ✓";
export const SK_ICON = "🔑 ✓✓";
export const DSBL_ICON = "🔑 ✗";
export const CT_ICON = "🔒";

/* Filename for exported keys */
export const KEY_FILE = "keys.txt";

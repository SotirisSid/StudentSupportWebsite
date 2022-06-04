PRAGMA foreign_keys = ON; 
PRAGMA encoding="UTF-8";

BEGIN TRANSACTION;
DROP TABLE IF EXISTS "USER";
CREATE TABLE IF NOT EXISTS "USER" (
    "id" integer NOT NULL AUTOINCREMENT,
    "username" varchar(255) NOT NULL,
    "fName" varchar(255),
    "lName" varchar(255),
    "hashed_password" BLOB,
    "salt" BLOB ,
    PRIMARY KEY("id"),
    UNIQUE("username")
);

DROP TABLE IF EXISTS "ADMIN";
CREATE TABLE IF NOT EXISTS "ADMIN" (
    "id" integer NOT NULL,
    CONSTRAINT "ADMIN_USER_FK" FOREIGN KEY("id") REFERENCES "USER"("id")	ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "STUDENT";
CREATE TABLE IF NOT EXISTS "STUDENT" (
    "id" integer NOT NULL,
    CONSTRAINT "STUDENT_USER_FK" FOREIGN KEY("id") REFERENCES "USER"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "PROFESSOR";
CREATE TABLE IF NOT EXISTS "PROFESSOR" (
    "id" integer NOT NULL,
    CONSTRAINT "PROFESSOR_USER_FK" FOREIGN KEY("id") REFERENCES "USER"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "SUBJECT";
CREATE TABLE IF NOT EXISTS "SUBJECT" (
    "sub_id" integer NOT NULL,
    "year" integer,
    "title" varchar(255),
    PRIMARY KEY("sub_id")
);

DROP TABLE IF EXISTS "ANNOUNCEMENT";
CREATE TABLE IF NOT EXISTS "ANNOUNCEMENT" (
    "ann_id" integer NOT NULL AUTOINCREMENT,
    "content" text,
    "upload_date" date,
    "title" text,
    "subject_id" integer,
    "professor_id" integer,
    CONSTRAINT "ANNOUNCEMENT_SUBJECT_FK" FOREIGN KEY("subject_id") REFERENCES "SUBJECT"("sub_id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    CONSTRAINT "ANNOUNCEMENT_PROFESSOR_FK" FOREIGN KEY("professor_id") REFERENCES "PROFESSOR"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    PRIMARY KEY("ann_id")
);



DROP TABLE IF EXISTS "SEES";
CREATE TABLE IF NOT EXISTS "SEES" (
    "student_id" integer NOT NULL,
    "announcement_id" integer NOT NULL,
    CONSTRAINT "STUDENT_SEES_FK" FOREIGN KEY("student_id") REFERENCES "STUDENT"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    CONSTRAINT "ANNOUNCEMENT_SEES_FK" FOREIGN KEY("announcement_id") REFERENCES "ANNOUNCEMENT"("ann_id")	ON UPDATE CASCADE	ON DELETE CASCADE
);

DROP TABLE IF EXISTS "ATTENDS";
CREATE TABLE IF NOT EXISTS "ATTENDS" (
    "student_id" integer NOT NULL,
    "subject_id" integer NOT NULL,
    CONSTRAINT "STUDENT_ATTENDS_FK" FOREIGN KEY("student_id") REFERENCES "STUDENT"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    CONSTRAINT "SUBJECT_ATTENDS_FK" FOREIGN KEY("subject_id") REFERENCES "SUBJECT"("sub_id")	ON UPDATE CASCADE	ON DELETE CASCADE
);

DROP TABLE IF EXISTS "TEACHES";
CREATE TABLE IF NOT EXISTS "TEACHES" (
    "professor_id" integer NOT NULL,
    "subject_id" integer NOT NULL,
    CONSTRAINT "PROFESSOR_TEACHES_FK" FOREIGN KEY("professor_id") REFERENCES "PROFESSOR"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    CONSTRAINT "SUBJECT_TEACHES_FK" FOREIGN KEY("subject_id") REFERENCES "SUBJECT"("sub_id")	ON UPDATE CASCADE	ON DELETE CASCADE
);

DROP TABLE IF EXISTS "EDITS_S";
CREATE TABLE IF NOT EXISTS "EDITS_S" (
    "admin_id" integer NOT NULL,
    "subject_id" integer NOT NULL,
    CONSTRAINT "ADMIN_EDITS_S_FK" FOREIGN KEY("admin_id") REFERENCES "ADMIN"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    CONSTRAINT "SUBJECT_EDITS_S_FK" FOREIGN KEY("subject_id") REFERENCES "SUBJECT"("sub_id")	ON UPDATE CASCADE	ON DELETE CASCADE
);

DROP TABLE IF EXISTS "EDITS_A";
CREATE TABLE IF NOT EXISTS "EDITS_A" (
    "admin_id" integer NOT NULL,
    "announcement_id" integer NOT NULL,
    CONSTRAINT "ADMIN_EDITS_A_FK" FOREIGN KEY("admin_id") REFERENCES "ADMIN"("id")	ON UPDATE CASCADE	ON DELETE CASCADE,
    CONSTRAINT "ANNOUNCEMENT_EDITS_A_FK" FOREIGN KEY("announcement_id") REFERENCES "ANNOUNCEMENT"("ann_id")	ON UPDATE CASCADE	ON DELETE CASCADE
);

-----------------------------------------------------------------------

INSERT INTO "USER" ("id", "username", "fName", "lName", "hashed_password","salt") VALUES
    (0, "thegreatestadmin", "Sinus", "Lebastian", "yJ3GHhWNxuBS2CV3",10), --ADMIN
    (1, "prafar", "Pranav", "Farley", "mAKfWFCY8x2U2Gte",10), --PROF
    (2, "anmac", "Anisha", "Macdonald", "YwfqsH7c9k4DXjCB",10), --STUD
    (3, "elihaas", "Elisabeth", "Haas", "82ZGWDMSmmDmnLV3",10), --STUD
    (4, "t.hurst", "Teresa", "Hurst", "jHBH8ZESXcXkKVF6",10), --PROF
    (5, "eboni.l", "Eboni", "Lees", "9fsv82M8eSjFyFZU",10), -- STUD
    (6, "ellaheb", "Ella-Grace", "Hebert", "d5eYLU68QfvRB2Sy",10); --STUD

INSERT INTO "ADMIN" ("id") VALUES
    (0);

INSERT INTO "STUDENT" ("id") VALUES
    (2),
    (3),
    (5),
    (6);

INSERT INTO "PROFESSOR" ("id") VALUES
    (1),
    (4);

INSERT INTO "SUBJECT" ("sub_id", "year", "title") VALUES
    (703, 2021, "database"),
    (802, 2021, "web");


INSERT INTO "ANNOUNCEMENT" ("ann_id", "content", "upload_date", "title", "subject_id", "professor_id") VALUES
    (1000, "Την ερχόμενη εβδομάδα θα πραγματοποιηθούν οι τελικές παρουσιάσεις των ομαδικών εργασιών. Η προσθεσμία κατάθεσης της ομαδικής σας εργασίας είναι η Κυριακή 16/01/2022.

Οι παρουσιάσεις οργανώνονται σε διαστήματα της μιας ώρας και κάθε ομάδα έχει στη διάθεσή της αυστηρά 10 λεπτά. Σε αυτό το χρόνο η ομάδα θα πρέπει να δείξει σε λειτουργία την εφαρμογή που σχεδίασε και ανέπτυξε και να απαντήσει σε ερωτήσεις πάνω στον κώδικα SQL και τον κώδικα της εφαρμογής που έγραψε καθώς και για το σχεδιασμό της βάσης δεδομένων, τις παραδοχές του μικρόκοσμου και γενικότερα τις αποφάσεις που πήρε για την υλοποίηση του πρότζεκτ.

Οι παρουσιάσεις θα πραγματοποιηθούν μέσω του Zoom. Ο σύνδεσμος έχει αναρτηθεί και στο μενού, στο eclass του μαθήματος.

Οι ομάδες είναι υποχρεωμένες να είναι συνδεδεμένες από την αρχή μέχρι το τέλος του διαστήματος της μιας ώρας που τους έχει αντιστοιχηθεί.

Η παρακολούθηση των εργασιών των άλλων ομάδων και της σχετικής συζήτησης είναι πολλές φορές ιδιαίτερα διδακτική εμπειρία. Γι'αυτό σας προτρέπουμε να δείτε παρουσιάσεις ακόμη και πέρα από το διάστημα της μιας ώρας για το οποίο η παρακολούθηση είναι υποχρεωτική.",
 "2021-10-23", "Τελική παρουσίαση ομαδικών εργασιών", 703, 1),
    (1001, "Όπως ανακοινώθηκε στη σημερινή διάλεξη, προϋπόθεση συμμετοχής στο φετινό εργαστήριο του μαθήματος είναι η επιλογή εργαστηριακής ομάδας.

Παρακαλούμε μέχρι την Τετάρτη, 2 Μαρτίου, να έχετε επιλέξει μια από τις δύο διαθέσιμες ομάδες ακολουθώντας το σύνδεσμο Ομάδες Χρηστών -> Εργαστηριακές ομάδες.",
     "2022-03-11", "Επιλογή ομάδας εργαστηρίου", 802, 4),
    (1002, "Ανακοινώνεται ότι έχει ενεργοποιηθεί η εγγραφή στις ομάδες των ομδικών εργασιών.

Μπορείτε να εγγραφείτε σε μια από τις ομάδες επιλέγοντας Ομάδες Χρηστών > Ομαδική εργασία (πρότζεκτ). Κάθε ομάδα είναι αυστηρά διμελής. Αν έχετε ήδη αποφασίσει για τον συνεργάτη σας, βεβαιωθείτε ότι και οι δύο εγγράφεστε στην ίδια ομάδα.

Προθεσμία για την εγγραφή είναι η Παρασκευή 18 Μαρτίου. Μετά από αυτή την ημερομηνία οι ομάδες θα συμπληρωθούν αυτόματα και έπειτα θα ανατεθούν οι εργασίες στις ομάδες που έχουν δημιουργηθεί.",
 "2021-11-19", "Εγγραφή σε ομάδες πρότζεκτ", 703, 4),
    (1003, "Όπως έχει ανακοινωθεί, από αυτή τη βδομάδα έχουν αλλάξει τα αμφιθέατρα κάποιων μαθημάτων. Οι διαλέξεις του μαθήματος Βάσεις Δεδομένων (Τετάρτη 9-12) μεταφέρονται στο αμφιθέατρο ΗΛ8 από το ΗΛ3.",
     "2022-02-05", "Άλλαγή αίθουσας διδασκαλίας", 703, 1),
    (1004, "Ως γνωστόν, καθώς η αργία της Πρωτομαγιάς μεταφέρθηκε για τις 2/5, δεν είναι δυνατό να πραγματοποιηθεί το εργαστήριο της ερχόμενης Δευτέρας.

Για να αναπληρωθεί το κενό που προκύπτει στο πρόγραμμα των εργαστηριακών ασκήσεων, η 6η εργαστηριακή άσκηση θα εκπονηθεί από το σπίτι. Έχει αναρτηθεί η εκφώνησή της και η προθεσμία υποβολής είναι την Πέμπτη, 5 Μαΐου.

Η εκφώνηση της άσκησης περιέχει λεπτομερείς οδηγίες.",
 "2022-05-03", "Αργία της Πρωτομαγιάς - εξ αποστάσεως εκπόνηση της 6ης άσκηση", 802, 4);


INSERT INTO "SEES" ("student_id", "announcement_id") VALUES
    (2, 1000),
    (2, 1002),
    (2, 1003),
    (3, 1000),
    (3, 1001),
    (3, 1002),
    (3, 1003),
    (3, 1004),
    (5, 1001),
    (5, 1004),
    (6, 1000),
    (6, 1001),
    (6, 1002),
    (6, 1003),
    (6, 1004);

INSERT INTO "ATTENDS" ("student_id", "subject_id") VALUES
    (2, 703),
    (3, 703),
    (3, 802),
    (5, 802),
    (6, 703),
    (6, 802);

INSERT INTO "TEACHES" ("professor_id", "subject_id") VALUES
    (1, 703),
    (4, 703),
    (4, 802);

INSERT INTO "EDITS_S" ("admin_id", "subject_id") VALUES
    (0, 703),
    (0, 802);

INSERT INTO "EDITS_A" ("admin_id", "announcement_id") VALUES
    (0, 1000),
    (0, 1001),
    (0, 1002),
    (0, 1003),
    (0, 1004);

COMMIT;
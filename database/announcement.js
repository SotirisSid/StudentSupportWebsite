class Announcement { 
    constructor (ann_id, content, upload_date, title, subject_id, professor_id) {
        this.ann_id = ann_id;
        this.content = content;
        this.upload_date = upload_date;
        this.title = title;
        this.subject_id = subject_id;
        this.professor_id = professor_id;
        
    }
}

module.exports = Announcement;
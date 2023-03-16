export interface Appointment {
    id?: number; // optional ID field, as the server will generate it for new appointments
    title: string; // title of the appointment
    description?: string; // optional description of the appointment
    start: Date; // start time of the appointment
    end: Date; // end time of the appointment
    location?: string; // optional location of the appointment
    participants?: string[]; // optional array of participants' email addresses
}
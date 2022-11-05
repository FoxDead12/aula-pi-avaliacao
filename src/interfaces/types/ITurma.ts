export interface ITurma {

    curso: string,
    ano: number,
    nome: string,
    horario: {
        segunda: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                professor: string,
                sala: number
            }
        ],
        terca: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                professor: string,
                sala: number
            }
        ],
        quarta: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                professor: string,
                sala: number
            }
        ],
        quinta: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                professor: string,
                sala: number
            }
        ],
        sexta: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                professor: string,
                sala: number
            }
        ]        
    }
}
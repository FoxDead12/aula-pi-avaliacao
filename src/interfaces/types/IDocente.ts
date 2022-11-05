export interface IDocente {

    nome: string,
    horario: {
        segunda: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                sala: number
            }
        ],
        terca: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                sala: number
            }
        ],
        quarta: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                sala: number
            }
        ],
        quinta: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                sala: number
            }
        ],
        sexta: [
            {
                horaInicio: Date,
                horaFim: Date,
                disciplinaNome: string,
                sala: number
            }
        ]        
    }
}
export interface ITurma {
  curso: string;
  ano: string;
  nome: string;
  horario: IHorario;
}

export interface IHorario {
      segunda: [
      {
        horaInicio: Date;
        horaFim: Date;
        disciplinaNome: string;
        professor: string;
        sala: string;
      },
    ];
    terca: [
      {
        horaInicio: Date;
        horaFim: Date;
        disciplinaNome: string;
        professor: string;
        sala: string;
      },
    ];
    quarta: [
      {
        horaInicio: Date;
        horaFim: Date;
        disciplinaNome: string;
        professor: string;
        sala: string;
      },
    ];
    quinta: [
      {
        horaInicio: Date;
        horaFim: Date;
        disciplinaNome: string;
        professor: string;
        sala: string;
      },
    ];
    sexta: [
      {
        horaInicio: Date;
        horaFim: Date;
        disciplinaNome: string;
        professor: string;
        sala: string;
      },
    ];
    sabado: [
        {
          horaInicio: Date;
          horaFim: Date;
          disciplinaNome: string;
          professor: string;
          sala: string;
        },
      ];
}
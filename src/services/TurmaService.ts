import { ITurmaService } from "src/interfaces/services/ITurmaService";
import { ITurma } from "src/interfaces/types/ITurma";

export class TurmaService implements ITurmaService {
    
    
    getMany(listUrls: string[], mainUrl: string): Promise<ITurma[]> {
        
        let errosLinks = [];

        listUrls.forEach(async (link)  => {

            try {

                const result = await this.getOne(mainUrl + link);
            }
            catch (e) {

                errosLinks.push(link);
            }
        })

        return;
    }


    getOne(link: string): Promise<ITurma> {

        console.log(link)
        throw new Error("Method not implemented.");
    }


}
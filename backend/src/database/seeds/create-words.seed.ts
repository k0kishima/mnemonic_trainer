import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Word } from '$backend/word/word.entity';

export default class CreateWords implements Seeder {
  // TODO: factory 使う方式はなぜか引数の factory が undefined になるので原因を究明する
  // TODO: データの作り方を改善する　。例えば単語名がなんでもいいなら `createMany()` みたいなのでダミーデータ作った方がいい
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Word)
      .values([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
        { name: 'e' },
        { name: 'f' },
        { name: 'g' },
        { name: 'h' },
        { name: 'i' },
        { name: 'j' },
      ])
      .execute();
  }
}

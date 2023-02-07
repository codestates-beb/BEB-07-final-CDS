import { AppDataSource } from './data-source';
import getEnv from './utils/getEnv';
import updateGeckoFeed from './utils/updateGeckoFeed';
import updateChainLinkFeed from './utils/updateChainLinkFeed';
import app from './app';

AppDataSource.initialize()
  .then(async () => {
    app.listen(app.get('port'), () => {
      updateChainLinkFeed();
      updateGeckoFeed();
      setInterval(() => {
        updateChainLinkFeed();
        updateGeckoFeed();
      }, 20 * 1000);

      console.log(`Server is running at ${app.get('port')}`);
    });
  })
  .catch((error) => console.log(error));

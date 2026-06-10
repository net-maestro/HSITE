<template>
  <v-card-subtitle
    class="subtitle-slider subtitle-slider text-center text-h6 text-uppercase mt-2 mb-4"
  >
    {{ $t("menu.tv-list") }}
  </v-card-subtitle>
  <v-container class="card-animate">
    <v-row justify="space-between" align="center">
      <v-col cols="12" sm="6">
        <v-card-title class="text-center"> Перелік телеканалів </v-card-title>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="filter"
          append-icon="mdi-magnify"
          label="Швидкий пошук"
          single-line
          hide-details
          outlined
          color="teal-lighten-1"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-table height="600px" density="compact" fixed-header hover striped>
      <thead>
        <tr>
          <th>Тарифи</th>
          <th>
            <v-card-subtitle>
              <span class="currency">S</span>
              <br />
              <span class="price">₴ 99</span> / міс
            </v-card-subtitle>
          </th>
          <th>
            <v-card-subtitle>
              <span class="currency">M</span>
              <br />
              <span class="price">₴ 99</span> / міс
            </v-card-subtitle>
          </th>
          <th>
            <v-card-subtitle>
              <span class="currency">L</span>
              <br />
              <span class="price">₴ 149</span> / міс
            </v-card-subtitle>
          </th>
        </tr>
        <tr>
          <th>Кількість телеканалів</th>
          <th class="tariffs-ua__compare-modal-content-tariffs-tariff-number">
            245
          </th>
          <th class="tariffs-ua__compare-modal-content-tariffs-tariff-number">
            333
          </th>
          <th class="tariffs-ua__compare-modal-content-tariffs-tariff-number">
            347
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(channel, index) in filteredChannels"
          :key="channel.id"
          :class="{
            'zebra-dark': index % 2 === 0,
            'zebra-light': index % 2 !== 0,
          }"
        >
          <td>
            <v-row
              class="tariffs-ua__compare-modal-content-channels-channel-header"
            >
              <v-col cols="3">
                <v-img
                  :src="channel.img"
                  alt="Logo"
                  class="tariffs-ua__compare-modal-content-channels-channel-header-img"
                ></v-img>
              </v-col>
              <v-col cols="9">
                <h4
                  class="tariffs-ua__compare-modal-content-channels-channel-header-title"
                >
                  {{ channel.title }}
                </h4>
              </v-col>
            </v-row>
          </td>
          <td>
            <v-icon v-if="channel.availability[0].active" color="primary"
              >mdi-check mdi-36px</v-icon
            >
          </td>
          <td>
            <v-icon v-if="channel.availability[1].active" color="primary"
              >mdi-check mdi-36px</v-icon
            >
          </td>
          <td>
            <v-icon v-if="channel.availability[2].active" color="primary"
              >mdi-check mdi-36px</v-icon
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      channels: [
        {
          id: 1,
          img: "https://static.sweet.tv/images/icons/channels/v2/1226-1-1-ukraina-hd.png",
          title: "1+1 Україна HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 2,
          img: "https://static.sweet.tv/images/icons/channels/v2/15-stb-hd.png",
          title: "СТБ HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 3,
          img: "https://static.sweet.tv/images/icons/channels/v2/5-novyy-kanal-hd.png",
          title: "Новий канал HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 4,
          img: "https://static.sweet.tv/images/icons/channels/v2/1225-ictv-2-hd.png",
          title: "ICTV 2 HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },

        {
          id: 6,
          img: "https://static.sweet.tv/images/icons/channels/v2/397-2-2-hd.png",
          title: "2+2 HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 7,
          img: "https://static.sweet.tv/images/icons/channels/v2/484-tet-hd.png",
          title: "ТЕТ HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 8,
          img: "https://static.sweet.tv/images/icons/channels/v2/8-ntn-hd.png",
          title: "НТН HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 9,
          img: "https://static.sweet.tv/images/icons/channels/v2/186-bigudi-hd.png",
          title: "Бігуді HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 10,
          img: "https://static.sweet.tv/images/icons/channels/v2/1448-orel-reshka.png",
          title: "Орел і Решка HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 11,
          img: "https://static.sweet.tv/images/icons/channels/v2/103-plyusplyus-hd.png",
          title: "ПЛЮС ПЛЮС HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 12,
          img: "https://static.sweet.tv/images/icons/channels/v2/456-kvartal-tv-hd.png",
          title: "KVARTAL TV HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },

        {
          id: 13,
          img: "https://static.sweet.tv/images/icons/channels/v2/1755-kasaetsya-kazhdogo-hd.png",
          title: "Стосується кожного HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 14,
          img: "https://static.sweet.tv/images/icons/channels/v2/512-comedy-central-hd.png",
          title: "Comedy Central HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 15,
          img: "https://static.sweet.tv/images/icons/channels/v2/1574-veshdok-hd.png",
          title: "Вещдок HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 14,
          img: "https://static.sweet.tv/images/icons/channels/v2/31-k1-hd.png",
          title: "K1 HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
        {
          id: 14,
          img: "https://static.sweet.tv/images/icons/channels/v2/1780-tvoy-serial-hd.png",
          title: "Твій серіал HD",
          availability: [
            { name: "channels_s", active: true },
            { name: "channels_m", active: true },
            { name: "channels_l", active: true },
          ],
        },
      ],
      // Add more channels as needed
    };
  },
  computed: {
    filteredChannels() {
      return this.channels.filter((channel) => {
        return channel.title.toLowerCase().includes(this.filter.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.tariffs-ua__compare-modal-window {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tariffs-ua__compare-modal-content-tariffs-tariff-number {
  font-size: 16px;
  color: #4caf50;
}

.tariffs-ua__compare-modal-content-channels-channel-header {
  display: flex;
  align-items: center;
}

.tariffs-ua__compare-modal-content-channels-channel-header-img {
  width: 48px;
  height: 48px;
}

.tariffs-ua__compare-modal-content-channels-channel-header-title {
  font-size: 16px;
  font-weight: 600;
  margin-left: 16px;
}

.zebra-dark {
  background-color: #424242;
  opacity: 0.9;
}

.zebra-light {
  background-color: #ffffff;
  opacity: 0.9;
}
</style>

<template>
  <div class="position-relative" v-if="liveProfile">
    <div class="profile-container mb-5">
      <div class="profile-wrapper px-3">
        <div class="profile-cover" :style="{ '--dynamic-content': liveProfile.theme ? liveProfile.theme.secondary : 'rgb(34, 34, 34)' }">
          <div></div>
        </div>
        <div class="profile-card mx-2">
          <div class="d-flex">
            <div class="profile-img d-flex" style="background: rgb(41, 41, 41); border-radius: 26.4px 0 0 26.4px">
              <img v-if="liveProfile.profileImage" :src="liveProfile.profileImage" />
              <span v-else class="d-flex mt-auto w-100">
                <svg width="100%" height="227.33333333333331" viewBox="0 0 122 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M61.0005 79C79.2248 79 94 61.3154 94 39.5002C94 17.6846 89.1491 0 61.0005 0C32.8518 0 28 17.6846 28 39.5002C28 61.3154 42.7752 79 61.0005 79Z" fill="#686868"></path><path opacity="0.4" d="M121.932 138.151C121.334 99.8308 116.405 88.9117 78.6861 82C78.6861 82 73.3766 88.8694 61.0014 88.8694C48.6261 88.8694 43.3157 82 43.3157 82C6.00888 88.8363 0.7801 99.5934 0.0925852 136.906C0.036209 139.953 0.0100836 140.113 0 139.759C0.00229172 140.422 0.0925852 160 0.0925852 160H61H122C122 160 121.999 141.457 122 140.807C121.99 141.026 121.97 140.602 121.932 138.151Z" fill="#686868"></path>
                </svg>
              </span>
            </div>
            <div class="profile-info" :style="{ background: liveProfile.theme ? liveProfile.theme.background : '#000000' }">
              <h2 :style="{ color: liveProfile.theme ? liveProfile.theme.color : '#ffffff' }">
                {{ fullName[0] }}
                <br />
                {{ fullName[1] }}
                <span class="job-title" :style="{ color: liveProfile.theme ? liveProfile.theme.altColor : '#c7c7c7' }">
                  {{ liveProfile.jobTitle }}
                </span>
                <span v-if="liveProfile.company" :style="{ color: liveProfile.theme ? liveProfile.theme.altColor : '#c7c7c7' }">
                  At {{ liveProfile.company }}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div class="user-bio">
          <UserBio :currentUser="liveProfile" :preview="false" />
        </div>
        <div class="social-media">
          <UserSocialMedia :currentUser="liveProfile" :preview="false" />
        </div>
        <div class="links">
          <UserLinks :currentUser="liveProfile" :preview="false" />
        </div>
        <div class="video">
          <UserVideo :currentUser="liveProfile" :preview="false" />
        </div>
        <div class="contact">
          <UserContact :currentUser="liveProfile" :contactInfo="contactInfo" :preview="false" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

  definePageMeta({
    layout: "preview",
  });

  const route = useRoute();
  const nuxtApp = useNuxtApp();
  const liveProfile = ref();
  const contactInfo = ref();

  const fullName = computed(() => {
    if (!liveProfile.value && !liveProfile.value.displayName) return [];
    const name = liveProfile.value.displayName.split(' ');
    return name;
  })

  onMounted(async () => {
    const querySnapshot = await getDocs(collection(nuxtApp.$firestore, 'users'));
    const contactRef = doc(nuxtApp.$firestore, 'contact_info', route.params.slug);
    const rawData = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      data.profile.forEach((obj) => {
        rawData.push(obj)
      })
    });
    
    const profile = rawData.find((p) => {
      return p.slug === route.params.slug;
    });
    
    liveProfile.value = profile;
    
    onSnapshot(contactRef,
      (snap) => {
        contactInfo.value = snap.data()
      },
      (error) => {
        //
      },
    );
  })
</script>
<style lang="scss">
.header-btn {
  padding: 12px 16px;
}
.profile-container {
  position: relative;

  .profile-wrapper {
    position: relative;

    .profile-cover {
      --dynamic-content: rgb(34, 34, 34);
      height: 120px;
      
      &::after {
        content: "";
        position: absolute;
        height: 120px;
        top: 0px;
        z-index: -1;
        left: 0px;
        right: 0px;
        // background: rgb(34, 34, 34);
        background: var(--dynamic-content);
      }
    }

    .profile-card {
      position: relative;
      top: -62px;

      > div {
        width: 100%;
        height: 331px;
        border-radius: 26.4px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 20px;
        color: rgb(255, 255, 255);
        background: rgb(1, 1, 1);
      }

      .profile-img {
        flex: 0 0 275px;
      }
      .profile-info {
        flex: 1;
        padding: 0 20px;
        display: flex;
        align-items: center;

        h2 {
          color: #fff;
          font-weight: 700;
          font-size: 45px;
          line-height: 45px;
          text-transform: capitalize;
          margin: 0;
          display: flex;
          flex-direction: column;

          span {
            font-weight: 400;
            font-size: 21px;
            line-height: 23px;
            color: #c7c7c7;
          }
        }
      }
    }
  }
}
</style>
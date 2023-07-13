<template>
  <div class="my-4">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="heading-">Contact Info.</h3>
          <nuxt-link to="/profile/edit-contact-info">edit</nuxt-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="p-0 m-0" v-if="contactInfo && contactInfo.phone">
          <li v-for="phone in contactInfo.phone" :key="phone.id">
            <div class="d-flex items-center" v-if="filterProperties(phone)">
              <span>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376" />
                </svg>
              </span>
              <a :href="'tel:' + phone.value" target="_self" class="w-100">
                <div>
                  {{ phone.value }}
                </div>
              </a>
            </div>
          </li>
        </ul>
        <ul class="p-0 m-0" v-if="contactInfo && contactInfo.email">
          <li class="d-flex items-center" v-for="email in contactInfo.email" :key="email.id">
            <div class="d-flex items-center" v-if="filterProperties(email)">
              <span>
                <svg width="24" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
                </svg>
              </span>
              <a :href="'mailto:' + email.email" target="_self" class="w-100">
                <div>
                  {{ email.email }}
                </div>
              </a>
            </div>
          </li>
        </ul>
        <ul class="p-0 m-0" v-if="contactInfo && contactInfo.website">
          <li v-for="website in contactInfo.website" :key="website.id">
            <div class="d-flex items-center" v-if="filterProperties(website)">
              <span>
                <svg height="24" width="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-1.5 5.505v9.995h-15v-9.995zm0-1.5h-15v-3.505h15zm-2.3-2.527c.442 0 .8.359.8.8 0 .442-.358.8-.8.8s-.8-.358-.8-.8c0-.441.358-.8.8-.8zm-1.65.777c0-.397-.352-.75-.75-.75-1.695 0-6.355 0-8.05 0-.399 0-.75.353-.75.75s.351.75.75.75h8.05c.398 0 .75-.353.75-.75z" fill-rule="nonzero" />
                </svg>
              </span>
              <a :href="website.url" target="_blank" class="w-100">
                <div>
                  {{ website.url }}
                </div>
              </a>
            </div>
          </li>
        </ul>
        <ul class="p-0 m-0" v-if="contactInfo && contactInfo.address">
          <li v-for="address in contactInfo.address" :key="address.id">
            <div class="d-flex items-center" v-if="filterProperties(address)">
              <span>
                <svg height="24" width="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-1.5 5.505v9.995h-15v-9.995zm0-1.5h-15v-3.505h15zm-2.3-2.527c.442 0 .8.359.8.8 0 .442-.358.8-.8.8s-.8-.358-.8-.8c0-.441.358-.8.8-.8zm-1.65.777c0-.397-.352-.75-.75-.75-1.695 0-6.355 0-8.05 0-.399 0-.75.353-.75.75s.351.75.75.75h8.05c.398 0 .75-.353.75-.75z" fill-rule="nonzero" />
                </svg>
              </span>
              <div class="w-100">
                <div>
                  {{ address.type }}: {{ address.streetLine2 }} {{ address.streetLine1 }} {{ address.city }} {{ address.state }} {{ address.postCode }} {{ address.country }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    contactInfo: [Array, Object]
  })

  // function filterProperties(data) {
  //   return data.address.map(obj => {
  //     const filteredObj = {};
  //     for (const key in obj) {
  //       if (key !== 'id' && key !== 'order' && key !== 'type') {
  //         if (obj[key] !== '') {
  //           filteredObj[key] = obj[key];
  //         }
  //       }
  //     }
  //     return filteredObj;
  //   }).filter(obj => Object.keys(obj).length > 0)
  // }

  function filterProperties(data) {
    const filteredObj = {};
    for (const prop in data) {
      if (prop !== 'id' && prop !== 'order' && prop !== 'type' && data[prop] !== '') {
        filteredObj[prop] = data[prop];
      }
    }
    return Object.keys(filteredObj).length > 0;
  }
</script>

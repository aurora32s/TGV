<template>
    <div>
        <div class='layer md'>
          <div class='box main'>
            <div class='title'>
                <img class='thum' src='../../assets/images/icon.png'/>
            </div>
          </div>
            {{msg}}
            <div class='con'>
                <button class='btn confirm' @click='onClickConfirmBtn'>확인</button>
            </div>
        </div>
        <div id='dim'/>
    </div>
</template>
<script>
export default {
  name: 'SingleBtnDialog',
  props: [
    'msg',
    'onClickConfirmBtn'
  ]
}
</script>

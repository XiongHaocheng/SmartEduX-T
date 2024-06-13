<template>
    <div style="height: 100%;margin-top: -10px;">
        <p class="text1">课程学习时长前四</p>
        <div style="height: 20vh;">
        <p style="font-size: 18px;color: #4B5B76;margin-left:20px;">学习A课时长：</p>
        <p style="font-size: 18px;color: #4B5B76;margin-left:20px;">学习B课时长：</p>
        <p style="font-size: 18px;color: #4B5B76;margin-left:20px;">学习C课时长：</p>
        <p style="font-size: 18px;color: #4B5B76;margin-left:20px;">学习D课时长：</p>
    </div>
        <p>该同学学习A课的时长最多</p>
    </div>
</template>

<script>
export default {
    name: ' LearnTime_Course',
    data() {
        return {

        }
    }
}

</script>

<style scoped>
.text1 {
    font-size: 20px;
    color: #4B5B76;
    font-weight: 600;
}
</style>
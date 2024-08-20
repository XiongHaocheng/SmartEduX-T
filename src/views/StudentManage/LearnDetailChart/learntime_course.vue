<template>
    <div style="height: 100%;margin-top: -10px;">
        <p class="text1">订阅课程学习情况</p>
        <div style="max-height: 20vh; overflow: auto;">
            <div v-for="(course, index) in courses" :key="index">
                <p style="font-size: 16px; color: #4B5B76; margin-left: 20px;">
                    《{{ course.coursename }}》学习情况：{{ course.studytime }}秒
                </p>
                <div style="display: flex;">
                    <p style="font-size: 14px; color: #4B5B76; margin-left: 20px;">
                        已完成：
                    </p>
                    <p style="font-size: 14px; color: #2ba471;">
                        {{ course.finished }}课时
                    </p>
                    <p style="font-size: 14px; color: #4B5B76; margin-left: 20px;">
                        未完成：
                    </p>
                    <p style="font-size: 14px; color: #d54941;">
                        {{ course.unfinished }}课时
                    </p>
                </div>
            </div>
        </div>
        <p>该同学学习《{{ maxCourseName }}》的时长最多</p>
    </div>
</template>

<script>
import { getLearnTimeCourseInfoAPI } from '@/apis/teacherHandler';
export default {
    name: ' LearnTime_Course',
    data() {
        return {
            userid: '',
            courses: [],
            maxCourseName: '',//学习时间最长的课程名
        }
    },
    created() {
        let url = window.location.href;
        // 使用正则表达式获取 userid 的值
        let userid = url.match(/[?&]userid=([^&]+)/);
        this.userid = userid ? userid[1] : null;
    },
    async mounted() {
        await this.getLearnTimeCourseInfoAPI(this.userid)
    },
    methods: {
        async getLearnTimeCourseInfoAPI(userid) {
            try {
                const response = await getLearnTimeCourseInfoAPI(userid);
                // 将课程信息存储在数组中
                //console.log(response.data.data.courses)
                // 使用 forEach 遍历 response 数组中的每个元素
                response.data.data.courses.forEach(course => {
                    this.courses.push({
                        coursename: course.coursename,
                        studytime: parseFloat(course.studytime).toFixed(2),
                        finished: course.finished,
                        unfinished: course.unfinished
                    });
                });
                // 根据 studytime 对课程数组进行排序（从小到大）
                this.courses.sort((a, b) => parseFloat(a.studytime) - parseFloat(b.studytime));

                // 获取最长时间的课程名
                this.maxCourseName = this.courses[this.courses.length - 1].coursename;
            } catch (error) {
                console.error('Error fetching course info:', error);
            }
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
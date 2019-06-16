import { getReportDetail, dealReport } from '../../api/api-server'

export const reportDetailCtrl = {
	inject: ['reload'],
	data() {
		return {

		}
	},
	created() {
    console.log(this.$route.params.id);
  },
  methods: {
  	refreshPage() {
  		this.reload();
  	},
  	goHistory() {
  		this.$router.go(-1);
  	}
  }
}
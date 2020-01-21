<script>
import authService from '../../service/auth-service'

export default {
  created () {
    authService.logout()
  }
}
</script>

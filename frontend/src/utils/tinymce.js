import tinymce from 'tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/models/dom';

tinymce.init({
  selector: 'textarea#editor',
  plugins: 'advlist code emoticons link lists table',
  toolbar: 'bold italic | bullist numlist | link emoticons',
  skin: false,
  content_css: false,
});

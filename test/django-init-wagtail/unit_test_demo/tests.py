from django.test import TestCase  # noqa
from django.urls import reverse  # noqa
from .models import UnitTestDemoModel
from .forms import UnitTestDemoForm


class UnitTestDemoModelTest(TestCase):
     def setUp(self):
         self.instance = UnitTestDemoModel.objects.create(field1="value1", field2="value2")
 
     def test_instance_creation(self):
         self.assertIsInstance(self.instance, UnitTestDemoModel)
         self.assertEqual(self.instance.field1, "value1")
         self.assertEqual(self.instance.field2, "value2")
 
     def test_str_method(self):
         self.assertEqual(str(self.instance), "Expected String Representation")
 
 
class UnitTestDemoViewTest(TestCase):
     def setUp(self):
         self.instance = UnitTestDemoModel.objects.create(field1="value1", field2="value2")
 
     def test_view_url_exists_at_desired_location(self):
         response = self.client.get("/unit-test-demo-url/")
         self.assertEqual(response.status_code, 200)
 
     def test_view_url_accessible_by_name(self):
         response = self.client.get(reverse("unit-test-demo-view-name"))
         self.assertEqual(response.status_code, 200)
 
     def test_view_uses_correct_template(self):
         response = self.client.get(reverse("unit-test-demo-view-name"))
         self.assertEqual(response.status_code, 200)
         self.assertTemplateUsed(response, "unit-test-demo.html")
 
     def test_view_context(self):
         response = self.client.get(reverse("unit-test-demo-view-name"))
         self.assertEqual(response.status_code, 200)
         self.assertIn("context_variable", response.context)
 
 
class UnitTestDemoFormTest(TestCase):

     def test_form_valid_data(self):
         form = UnitTestDemoForm(data={"field1": "value1", "field2": "value2"})
         self.assertTrue(form.is_valid())
 
     def test_form_invalid_data(self):
         form = UnitTestDemoForm(data={"field1": "", "field2": "value2"})
         self.assertFalse(form.is_valid())
         self.assertIn("field1", form.errors)
 
     def test_form_save(self):
         form = UnitTestDemoForm(data={"field1": "value1", "field2": "value2"})
         if form.is_valid():
             instance = form.save()
             self.assertEqual(instance.field1, "value1")
             self.assertEqual(instance.field2, "value2")
